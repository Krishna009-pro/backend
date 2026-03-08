export const planetData = [
    {
        name: "Mercury",
        radius: 0.38,
        distance: 10,
        speed: 0.04,
        color: "#A5A5A5",
        texture: "/textures/mercury.png",
        info: {
            diameter: "4,880 km",
            temp: "167°C",
            description: "Mercury is the closest planet to the Sun. It has no atmosphere to retain heat, so it experiences extreme temperature fluctuations."
        }
    },
    {
        name: "Venus",
        radius: 0.95,
        distance: 15,
        speed: 0.015,
        color: "#E3BB76",
        texture: "/textures/venus.png",
        info: {
            diameter: "12,104 km",
            temp: "464°C",
            description: "Venus is the hottest planet in the Solar System due to its thick toxic atmosphere, which traps heat in a runaway greenhouse effect."
        }
    },
    {
        name: "Earth",
        radius: 1,
        distance: 20,
        speed: 0.01,
        color: "#2233FF",
        texture: "/textures/earth.png",
        info: {
            diameter: "12,742 km",
            temp: "15°C",
            description: "Earth is the only known planet to support life. It has one natural satellite, the Moon."
        }
    },
    {
        name: "Mars",
        radius: 0.53,
        distance: 25,
        speed: 0.008,
        color: "#E27B58",
        texture: "/textures/mars.png",
        info: {
            diameter: "6,779 km",
            temp: "-65°C",
            description: "Mars is known as the Red Planet due to iron oxide on its surface. It has the tallest volcano in the solar system, Olympus Mons."
        }
    },
    {
        name: "Jupiter",
        radius: 5,
        distance: 35,
        speed: 0.002,
        color: "#D8CA9D",
        texture: "/textures/jupiter.png",
        info: {
            diameter: "139,820 km",
            temp: "-110°C",
            description: "Jupiter is the largest planet in the Solar System. Its Great Red Spot is a giant storm bigger than Earth."
        }
    },
    {
        name: "Saturn",
        radius: 4,
        distance: 45,
        speed: 0.0009,
        color: "#C5AB6E",
        texture: "/textures/saturn.png",
        ring: {
            innerRadius: 4.5,
            outerRadius: 8,
            texture: "/textures/saturn_ring.png"
        },
        info: {
            diameter: "116,460 km",
            temp: "-140°C",
            description: "Saturn is famous for its extensive ring system, made mostly of ice particles with a smaller amount of rocky debris and dust."
        }
    },
    {
        name: "Uranus",
        radius: 2,
        distance: 55,
        speed: 0.0004,
        color: "#C6D3E3",
        texture: "/textures/uranus.png",
        info: {
            diameter: "50,724 km",
            temp: "-195°C",
            description: "Uranus spins on its side, likely due to a massive collision in its past. It has a pale blue color from methane in its atmosphere."
        }
    },
    {
        name: "Neptune",
        radius: 1.9,
        distance: 65,
        speed: 0.0001,
        color: "#5B5DDF",
        texture: "/textures/neptune.png",
        info: {
            diameter: "49,244 km",
            temp: "-200°C",
            description: "Neptune is the farthest known planet. It has the strongest winds in the solar system, reaching speeds of 2,100 km/h."
        }
    },
];
