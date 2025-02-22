function parseRobot(xml) {
    let xmelon;
    
    try {
        xmelon = $.parseXML(xml);
    } catch (error) {
        console.log("XML 파싱 오류:", error);
        return false;
    }

    window.scene = window.scene || new THREE.Scene();
    window.robot = new THREE.Object3D();
    window.robot.name = "robot";

    const linkMap = {};

    $(xmelon).find("link").each(function() {
        const linkData = $.xml2json(this);
        const linkName = linkData.name;
        let geometry, material, linkMesh;

        if (linkData.visual && linkData.visual.geometry) {
            const { box, cylinder } = linkData.visual.geometry;
            if (box) {
                const size = box.size.split(" ").map(Number);
                geometry = new THREE.BoxGeometry(...size);
            } else if (cylinder) {
                const radius = parseFloat(cylinder.radius);
                const length = parseFloat(cylinder.length);
                
                geometry = new THREE.CylinderGeometry(radius, radius, length, 32);

                // 바퀴(wheel)인지 확인하여 회전 축을 설정
                if (linkName.toLowerCase().includes("wheel")) {
                    geometry.rotateZ(Math.PI / 2); // Y축을 따라 회전하도록 설정
                } else {
                    geometry.rotateX(Math.PI / 2); // 기본 Z축을 따라 생성되도록 설정
                }
            } else {
                console.warn(`링크 ${linkName}에 지원되지 않는 geometry 형식이 있습니다.`);
            }

            if (linkData.visual.material && linkData.visual.material.color) {
                const colorData = linkData.visual.material.color.rgba.split(" ").map(Number);
                material = new THREE.MeshPhongMaterial({
                    color: new THREE.Color(colorData[0], colorData[1], colorData[2]),
                    opacity: colorData[3],
                    transparent: colorData[3] < 1
                });
            } else {
                material = new THREE.MeshPhongMaterial({ color: 0x6E23BB });
                console.warn(`링크 ${linkName}에 material 정보가 없습니다. 기본 색상 사용.`);
            }

            if (geometry && material) {
                linkMesh = new THREE.Mesh(geometry, material);
                linkMesh.name = linkName;

                const origin = linkData.visual.origin || {};
                setTransform(linkMesh, origin);
            }
        } else {
            console.warn(`링크 ${linkName}에 geometry 정보가 없습니다.`);
        }

        if (!linkMesh) {
            linkMesh = new THREE.Object3D();
            linkMesh.name = linkName;
        }

        linkMap[linkName] = linkMesh;
    });

    $(xmelon).find("joint").each(function() {
        const jointData = $.xml2json(this);
        const jointName = jointData.name;

        if (!jointData.parent || !jointData.parent.link || !jointData.child || !jointData.child.link) {
            console.warn(`조인트 ${jointName}에 parent 또는 child 링크 정보가 없습니다.`);
            return;
        }
        
        const parentLinkName = jointData.parent.link;
        const childLinkName = jointData.child.link;

        const parentLink = linkMap[parentLinkName];
        const childLink = linkMap[childLinkName];

        if (parentLink && childLink) {
            const jointObj = new THREE.Object3D();
            jointObj.name = jointName;
            
            const origin = jointData.origin || {};
            setTransform(jointObj, origin); // 조인트에 origin 적용

            parentLink.add(jointObj); // 부모 링크에 조인트 추가
            if (childLink.parent) {
                childLink.parent.remove(childLink); // 자식 링크를 이전 부모에서 제거
            }
            jointObj.add(childLink); // 조인트에 자식 링크 추가
        } else {
            console.warn(`조인트 ${jointName}에 연결할 링크를 찾을 수 없습니다: parent=${parentLinkName}, child=${childLinkName}`);
        }
    });

    Object.values(linkMap).forEach(function(link) {
        if (!link.parent) {
            window.robot.add(link);
        }
    });

    window.scene.add(window.robot);
    console.log("로봇 모델이 로드되고 씬에 추가되었습니다.");
    return true;
}

// transform 설정 함수
function setTransform(object, origin) {
    if (origin.xyz) {
        const position = origin.xyz.split(" ").map(Number);
        object.position.set(...position);
    } else {
        object.position.set(0, 0, 0);
    }

    if (origin.rpy) {
        const rotation = origin.rpy.split(" ").map(parseFloat).map(THREE.Math.degToRad);
        object.rotation.set(...rotation);
    } else {
        object.rotation.set(0, 0, 0);
    }
}
