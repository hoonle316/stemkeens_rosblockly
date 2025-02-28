# Stemkeens Rosblockly
![image](https://github.com/user-attachments/assets/19d4ce8c-337d-4df1-a62c-adee0f2b950f)

**Stemkeens Rosblockly** is a web block coding platform that simplifies ROS2-based robot modeling and simulation.  
It enables users to create URDF files through a block-based interface and supports simulation in Gazebo as well as visualization in RViz2, making it accessible even for beginners.

---

## System Requirements

This project has been tested with the following setup:

- **Operating System**: Ubuntu 20.04 LTS
- **ROS2 Distribution**: Humble
- **colcon**: 0.10.0 or later
- **Python**: 3.8 or later

It may also work on other environments, but these are the versions I have confirmed.

---

## Table of Contents
1. [Project Introduction](#project-introduction)
2. [Features](#features)
3. [Folder Structure](#folder-structure)
4. [Installation and Build](#installation-and-build)
5. [Usage](#usage)
6. [License](#license)
7. [Contact](#contact)

---

## Project Introduction
**Stemkeens Rosblockly** allows you to easily configure a ROS2 robot model using a block-based coding interface, automatically generating URDF files that can be used in Gazebo simulations and visualizations in RViz2.

- It is designed for students and beginners, eliminating the need to write complex ROS2 code.
- Integration with `rosbridge_server` enables real-time monitoring and command transmission via a web browser.

---

## Features
- **Block Coding Interface**  
  - Offers a variety of blocks for defining links, joints, geometric shapes, materials, ROS2 Control elements, and Gazebo plugins.
- **Automatic URDF Generation**  
  - Blocks are converted into a URDF file, quickly outlining the robot’s structure.
- **Gazebo and RViz2 Simulation**  
  - Provides launch files to simulate the robot in Gazebo and visualize it in RViz2.
- **(Optional) rosbridge Integration**  
  - When used with `rosbridge_server`, the web interface can monitor and control ROS2 topics in real time.

---

## Folder Structure

```plaintext
stemkeens_rosblockly/
├── build/               # colcon build outputs (ignored in Git)
├── install/             # Installation outputs (ignored in Git)
├── log/                 # Log files (ignored in Git)
├── src/
│   └── Rosblockly/
│       ├── CMakeLists.txt
│       ├── package.xml
│       └── web_ws/      # Web-related files (HTML, JS, CSS, etc.)
└── README.md
```

---

## Installation and Build

1. **Clone the Repository**
   ```bash
   git clone https://github.com/hoonle316/stemkeens_rosblockly.git
   cd stemkeens_rosblockly

---
## Build Using colcon
```
colcon build --symlink-install
```
---
## Source the environment
```
source install/setup.bash
```
---
## Usage
1. **Run the Web Block Coding Interface**  
   - You can serve the HTML files locally using a simple HTTP server. For example:
     ```bash
     cd src/Rosblockly/web_ws
     python3 -m http.server 7000
     ```
     Then, open your browser and navigate to `http://localhost:7000/index.html` (or `dashboard.html`).

2. **Assemble Blocks and Generate URDF Code**  
   - Use the block coding interface to drag and drop elements such as links, joints, sensors, and materials.
   - Click the "Export to ROS" button to download the generated URDF file or review the generated code.

```
## (Optional) rosbridge_server Integration
To enable real-time communication between the web dashboard and your ROS2 system, you can run the rosbridge server. This allows the web interface to subscribe to topics and send commands using WebSocket connections.

**Run the rosbridge server:**

```bash
ros2 launch rosbridge_server rosbridge_websocket_launch.xml
```
---
## License
This project is licensed under the [Apache License 2.0](./LICENSE).  
Please refer to the [LICENSE file](./LICENSE) for more details.

---
## Contact
- **GitHub Issues**: For bug reports or feature requests, please use the [Issues tab](../../issues).
- **Email**: hoonle135@gmail.com

---

