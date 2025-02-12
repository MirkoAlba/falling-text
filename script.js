window.addEventListener("load", function () {
  var defaultObjectOptions = {
    mass: 2,
    angle: 0,
    restitution: 0.01,
    friction: 0.1,
    sleepThreshold: 80,
    frictionAir: 0.025, // increasing the frictionAir will make the boxes fall slower
  };

  if (window.matchMedia("(max-width: 824px)").matches) {
    defaultObjectOptions.mass = 0.5;
  }

  var DEGREE_45 = Math.PI / 4,
    DEGREE_60 = Math.PI / 3,
    DEGREE_90 = Math.PI / 2,
    DEGREE_180 = Math.PI,
    DEGREE_270 = (Math.PI * 3) / 2,
    DEGREE_360 = Math.PI * 2,
    DEGREE_225 = (Math.PI * 5) / 4;

  var VIEW = {};
  VIEW.width = window.innerWidth;
  VIEW.height = window.innerHeight;
  VIEW.centerX = VIEW.width / 2;
  VIEW.centerY = VIEW.height / 2;
  VIEW.offsetX = VIEW.width / 2;
  VIEW.offsetY = VIEW.height / 2;

  // Matter.js module aliases
  var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    World = Matter.World,
    Bodies = Matter.Bodies;

  // create engine
  var engine = Engine.create({
      enableSleeping: true,
      constraintIterations: 4,
      positionIterations: 20,
      velocityIterations: 20,
      pixelRatio: 1,
    }),
    world = engine.world;

  world.gravity.y = 1;

  var url = new URL(window.location.href);

  var debug = false;

  // ?debug=true
  if (url.searchParams.get("debug") == 1) {
    debug = true;
  }

  var speed = url.searchParams.get("speed");

  // fall speed
  if (speed && speed > 0) {
    engine.timing.timeScale = speed;
  }

  const containerBoxes = document.getElementById("container-boxes");

  // create renderer
  var render = Render.create({
    engine: engine,
    element: debug ? containerBoxes : false,
    options: {
      width: VIEW.width,
      height: VIEW.height,
      background: "#f2f2f2",
      wireframeBackground: false,
      wireframes: false,
      hasBounds: true,
      enabled: true,
      showSleeping: debug,
      showDebug: debug,
      showBroadphase: debug,
      showBounds: debug,
      showVelocity: debug,
      showCollisions: debug,
      showAxes: false,
      showPositions: debug,
      showAngleIndicator: debug,
      showIds: debug,
      showShadows: false,
    },
  });

  Render.run(render);

  // create runner
  var runner = Runner.create({
    enableSleeping: false,
    // constraintIterations: 4,
    // positionIterations: 8,
    // velocityIterations: 8,
  });

  Runner.run(runner, engine);

  // add walls
  var wallopts = {
    isStatic: true,
    restitution: 0.1,
    friction: 0.2,
  };

  var groundopts = {
    isStatic: true,
    restitution: 0.1,
    friction: 0.2,
  };

  World.add(world, [
    // ground
    (ground = Bodies.rectangle(
      VIEW.width / 2,
      VIEW.height + 50,
      VIEW.width + 200,
      100,
      groundopts
    )),
    // walls
    (wallRight = Bodies.rectangle(
      VIEW.width + 50,
      VIEW.height / 2,
      100,
      VIEW.height,
      wallopts
    )), // right
    (wallLeft = Bodies.rectangle(
      -50,
      VIEW.height / 2,
      100,
      VIEW.height,
      wallopts
    )), // left
  ]);

  var pixelStartingPoint = -VIEW.height;

  // Boxes Array

  // Mobile
  var boxesToRender = [
    // pink boxes over the green ones
    {
      type: "pink",
      text: "SKIP AD",
      x: VIEW.width / 2 - 100,
      y: pixelStartingPoint - 1100,
      objectOptions: defaultObjectOptions,
    },
    {
      type: "pink",
      text: "SKIP AD",
      x: VIEW.width / 2 - 100,
      y: pixelStartingPoint - 1100,
      objectOptions: defaultObjectOptions,
    },
    {
      type: "pink",
      text: "SKIP AD",
      x: VIEW.width / 2 + 100,
      y: pixelStartingPoint - 1100,
      objectOptions: defaultObjectOptions,
    },
    {
      type: "pink",
      text: "SKIP AD",
      x: VIEW.width / 2,
      y: pixelStartingPoint - 1100,
      objectOptions: defaultObjectOptions,
    },
    // 90 degrees
    {
      type: "pink",
      text: "SKIP AD",
      x: VIEW.width / 2 + 100,
      y: pixelStartingPoint - 1000,
      objectOptions: mergeObjects(defaultObjectOptions, {
        angle: DEGREE_60,
      }),
    },
    {
      type: "pink",
      text: "SKIP AD",
      x: VIEW.width / 2,
      y: pixelStartingPoint - 1000,
      objectOptions: mergeObjects(defaultObjectOptions, {
        angle: -DEGREE_60,
      }),
    },
    {
      type: "pink",
      text: "SKIP AD",
      x: VIEW.width / 2 - 100,
      y: pixelStartingPoint - 1000,
      objectOptions: mergeObjects(defaultObjectOptions, {
        angle: DEGREE_60,
      }),
    },
    {
      type: "pink",
      text: "SKIP AD",
      x: VIEW.width / 2 + 100,
      y: pixelStartingPoint - 900,
      objectOptions: mergeObjects(defaultObjectOptions, {
        angle: DEGREE_60,
      }),
    },
    {
      type: "pink",
      text: "SKIP AD",
      x: VIEW.width / 2,
      y: pixelStartingPoint - 900,
      objectOptions: mergeObjects(defaultObjectOptions, {
        angle: -DEGREE_60,
      }),
    },
    {
      type: "pink",
      text: "SKIP AD",
      x: VIEW.width / 2 - 100,
      y: pixelStartingPoint - 900,
      objectOptions: mergeObjects(defaultObjectOptions, {
        angle: DEGREE_60,
      }),
    },
    {
      type: "pink",
      text: "SKIP AD",
      x: VIEW.width / 2 + 100,
      y: pixelStartingPoint - 800,
      objectOptions: mergeObjects(defaultObjectOptions, {
        angle: DEGREE_90,
      }),
    },
    {
      type: "pink",
      text: "SKIP AD",
      x: VIEW.width / 2,
      y: pixelStartingPoint - 850,
      objectOptions: mergeObjects(defaultObjectOptions, {
        angle: DEGREE_90,
      }),
    },
    {
      type: "pink",
      text: "SKIP AD",
      x: VIEW.width / 2 - 100,
      y: pixelStartingPoint - 800,
      objectOptions: mergeObjects(defaultObjectOptions, {
        angle: DEGREE_90,
      }),
    },
    // green boxes
    {
      type: "green",
      text: "NO WONDER",
      x: VIEW.width / 2,
      y: pixelStartingPoint - 700,
      objectOptions: defaultObjectOptions,
    },
    {
      type: "green",
      text: "THE SKIP",
      x: VIEW.width / 2,
      y: pixelStartingPoint - 600,
      objectOptions: defaultObjectOptions,
    },
    {
      type: "green",
      text: "BUTTON",
      x: VIEW.width / 2,
      y: pixelStartingPoint - 500,
      objectOptions: defaultObjectOptions,
    },
    {
      type: "green",
      text: "IS THE MOST",
      x: VIEW.width / 2,
      y: pixelStartingPoint - 400,
      objectOptions: defaultObjectOptions,
    },
    {
      type: "green",
      text: "POPULAR",
      x: VIEW.width / 2,
      y: pixelStartingPoint - 300,
      objectOptions: defaultObjectOptions,
    },
    {
      type: "green",
      text: "BUTTON",
      x: VIEW.width / 2 - 50,
      y: pixelStartingPoint - 200,
      objectOptions: defaultObjectOptions,
    },
    {
      type: "green",
      text: "EVER",
      x: VIEW.width / 2 + 100,
      y: pixelStartingPoint - 200,
      objectOptions: defaultObjectOptions,
    },
    // pink boxes under the green ones
    {
      type: "pink",
      text: "SKIP AD",
      x: VIEW.width / 2 + 100,
      y: pixelStartingPoint + 200,
      objectOptions: defaultObjectOptions,
    },
    {
      type: "pink",
      text: "SKIP AD",
      x: VIEW.width / 2,
      y: pixelStartingPoint + 250,
      objectOptions: mergeObjects(defaultObjectOptions, {
        angle: DEGREE_180,
      }),
    },
    {
      type: "pink",
      text: "SKIP AD",
      x: VIEW.width / 2 - 100,
      y: pixelStartingPoint + 200,
      objectOptions: defaultObjectOptions,
    },
    // row
    {
      type: "pink",
      text: "SKIP AD",
      x: VIEW.width / 2 + 100,
      y: pixelStartingPoint + 300,
      objectOptions: mergeObjects(defaultObjectOptions, {
        angle: -DEGREE_45,
      }),
    },
    {
      type: "pink",
      text: "SKIP AD",
      x: VIEW.width / 2,
      y: pixelStartingPoint + 350,
      objectOptions: mergeObjects(defaultObjectOptions, {
        angle: DEGREE_180,
      }),
    },
    {
      type: "pink",
      text: "SKIP AD",
      x: VIEW.width / 2 - 100,
      y: pixelStartingPoint + 300,
      objectOptions: mergeObjects(defaultObjectOptions, {
        angle: DEGREE_45,
      }),
    },
    // row
    {
      type: "pink",
      text: "SKIP AD",
      x: VIEW.width / 2 + 100,
      y: pixelStartingPoint + 400,
      objectOptions: defaultObjectOptions,
    },
    {
      type: "pink",
      text: "SKIP AD",
      x: VIEW.width / 2,
      y: pixelStartingPoint + 450,
      objectOptions: defaultObjectOptions,
    },
    {
      type: "pink",
      text: "SKIP AD",
      x: VIEW.width / 2 - 100,
      y: pixelStartingPoint + 400,
      objectOptions: defaultObjectOptions,
    },
  ];

  // Tablet
  if (window.matchMedia("(min-width: 768px)").matches) {
    boxesToRender = [
      // pink boxes over the green ones
      {
        type: "pink",
        text: "SKIP AD",
        x: VIEW.width / 2 - 100,
        y: pixelStartingPoint - 1100,
        objectOptions: defaultObjectOptions,
      },
      {
        type: "pink",
        text: "SKIP AD",
        x: VIEW.width / 2 - 100,
        y: pixelStartingPoint - 1100,
        objectOptions: defaultObjectOptions,
      },
      {
        type: "pink",
        text: "SKIP AD",
        x: VIEW.width / 2 + 100,
        y: pixelStartingPoint - 1100,
        objectOptions: defaultObjectOptions,
      },
      {
        type: "pink",
        text: "SKIP AD",
        x: VIEW.width / 2 - 100,
        y: pixelStartingPoint - 1100,
        objectOptions: defaultObjectOptions,
      },
      // 90 degrees
      {
        type: "pink",
        text: "SKIP AD",
        x: VIEW.width / 2 + 100,
        y: pixelStartingPoint - 1000,
        objectOptions: mergeObjects(defaultObjectOptions, {
          angle: DEGREE_60,
        }),
      },
      {
        type: "pink",
        text: "SKIP AD",
        x: VIEW.width / 2,
        y: pixelStartingPoint - 1000,
        objectOptions: mergeObjects(defaultObjectOptions, {
          angle: -DEGREE_60,
        }),
      },
      {
        type: "pink",
        text: "SKIP AD",
        x: VIEW.width / 2 - 100,
        y: pixelStartingPoint - 1000,
        objectOptions: mergeObjects(defaultObjectOptions, {
          angle: -DEGREE_90,
        }),
      },
      {
        type: "pink",
        text: "SKIP AD",
        x: VIEW.width / 2 + 100,
        y: pixelStartingPoint - 900,
        objectOptions: mergeObjects(defaultObjectOptions, {
          angle: DEGREE_60,
        }),
      },
      {
        type: "pink",
        text: "SKIP AD",
        x: VIEW.width / 2,
        y: pixelStartingPoint - 900,
        objectOptions: mergeObjects(defaultObjectOptions, {
          angle: -DEGREE_60,
        }),
      },
      {
        type: "pink",
        text: "SKIP AD",
        x: VIEW.width / 2 - 100,
        y: pixelStartingPoint - 900,
        objectOptions: mergeObjects(defaultObjectOptions, {
          angle: DEGREE_90,
        }),
      },
      {
        type: "pink",
        text: "SKIP AD",
        x: VIEW.width / 2 + 100,
        y: pixelStartingPoint - 800,
        objectOptions: mergeObjects(defaultObjectOptions, {
          angle: DEGREE_90,
        }),
      },
      {
        type: "pink",
        text: "SKIP AD",
        x: VIEW.width / 2,
        y: pixelStartingPoint - 850,
        objectOptions: mergeObjects(defaultObjectOptions, {
          angle: DEGREE_90,
        }),
      },
      {
        type: "pink",
        text: "SKIP AD",
        x: VIEW.width / 2 - 100,
        y: pixelStartingPoint - 800,
        objectOptions: mergeObjects(defaultObjectOptions, {
          angle: DEGREE_90,
        }),
      },
      // green boxes
      {
        type: "green",
        text: "NO WONDER",
        x: VIEW.width / 2,
        y: pixelStartingPoint - 700,
        objectOptions: defaultObjectOptions,
      },
      {
        type: "green",
        text: "THE SKIP",
        x: VIEW.width / 2,
        y: pixelStartingPoint - 600,
        objectOptions: defaultObjectOptions,
      },
      {
        type: "green",
        text: "BUTTON",
        x: VIEW.width / 2,
        y: pixelStartingPoint - 500,
        objectOptions: defaultObjectOptions,
      },
      {
        type: "green",
        text: "IS THE MOST",
        x: VIEW.width / 2,
        y: pixelStartingPoint - 400,
        objectOptions: defaultObjectOptions,
      },
      {
        type: "green",
        text: "POPULAR",
        x: VIEW.width / 2,
        y: pixelStartingPoint - 300,
        objectOptions: defaultObjectOptions,
      },
      {
        type: "green",
        text: "BUTTON",
        x: VIEW.width / 2 - 50,
        y: pixelStartingPoint - 200,
        objectOptions: defaultObjectOptions,
      },
      {
        type: "green",
        text: "EVER",
        x: VIEW.width / 2 + 100,
        y: pixelStartingPoint - 200,
        objectOptions: defaultObjectOptions,
      },
      // pink boxes under the green ones
      {
        type: "pink",
        text: "SKIP AD",
        x: VIEW.width / 2,
        y: pixelStartingPoint + 250,
        objectOptions: mergeObjects(defaultObjectOptions, {
          angle: DEGREE_180,
        }),
      },
      {
        type: "pink",
        text: "SKIP AD",
        x: VIEW.width / 2 - 100,
        y: pixelStartingPoint + 200,
        objectOptions: defaultObjectOptions,
      },
      // row
      {
        type: "pink",
        text: "SKIP AD",
        x: VIEW.width / 2 + 100,
        y: pixelStartingPoint + 300,
        objectOptions: mergeObjects(defaultObjectOptions, {
          angle: -DEGREE_45,
        }),
      },
      {
        type: "pink",
        text: "SKIP AD",
        x: VIEW.width / 2,
        y: pixelStartingPoint + 350,
        objectOptions: mergeObjects(defaultObjectOptions, {
          angle: DEGREE_180,
        }),
      },
      {
        type: "pink",
        text: "SKIP AD",
        x: VIEW.width / 2 - 100,
        y: pixelStartingPoint + 300,
        objectOptions: mergeObjects(defaultObjectOptions, {
          angle: DEGREE_45,
        }),
      },
    ];
  }

  // Desktop
  if (window.matchMedia("(min-width: 1025px)").matches) {
    boxesToRender = [
      // pink boxes over the green ones
      // top row
      {
        type: "pink",
        text: "SKIP AD",
        x: 250,
        y: pixelStartingPoint - 700,
        objectOptions: mergeObjects(defaultObjectOptions, {
          angle: DEGREE_90,
        }),
      },
      {
        type: "pink",
        text: "SKIP AD",
        x: VIEW.width / 3,
        y: pixelStartingPoint - 700,
        objectOptions: defaultObjectOptions,
      },
      {
        type: "pink",
        text: "SKIP AD",
        x: VIEW.width / 1.9,
        y: pixelStartingPoint - 700,
        objectOptions: defaultObjectOptions,
      },
      {
        type: "pink",
        text: "SKIP AD",
        x: VIEW.width / 2,
        y: pixelStartingPoint - 700,
        objectOptions: defaultObjectOptions,
      },
      {
        type: "pink",
        text: "SKIP AD",
        x: VIEW.width - VIEW.width / 3 + 50,
        y: pixelStartingPoint - 700,
        objectOptions: defaultObjectOptions,
      },
      {
        type: "pink",
        text: "SKIP AD",
        x: VIEW.width - VIEW.width / 4,
        y: pixelStartingPoint - 700,
        objectOptions: defaultObjectOptions,
      },
      {
        type: "pink",
        text: "SKIP AD",
        x: VIEW.width - VIEW.width / 6,
        y: pixelStartingPoint - 700,
        objectOptions: defaultObjectOptions,
      },
      // top row
      {
        type: "pink",
        text: "SKIP AD",
        x: 250,
        y: pixelStartingPoint - 600,
        objectOptions: mergeObjects(defaultObjectOptions, {
          angle: DEGREE_90,
        }),
      },
      {
        type: "pink",
        text: "SKIP AD",
        x: VIEW.width / 3,
        y: pixelStartingPoint - 600,
        objectOptions: defaultObjectOptions,
      },
      {
        type: "pink",
        text: "SKIP AD",
        x: VIEW.width / 1.9,
        y: pixelStartingPoint - 600,
        objectOptions: defaultObjectOptions,
      },
      {
        type: "pink",
        text: "SKIP AD",
        x: VIEW.width / 2,
        y: pixelStartingPoint - 600,
        objectOptions: defaultObjectOptions,
      },
      {
        type: "pink",
        text: "SKIP AD",
        x: VIEW.width - VIEW.width / 3 + 50,
        y: pixelStartingPoint - 600,
        objectOptions: defaultObjectOptions,
      },
      {
        type: "pink",
        text: "SKIP AD",
        x: VIEW.width - VIEW.width / 4,
        y: pixelStartingPoint - 600,
        objectOptions: defaultObjectOptions,
      },
      {
        type: "pink",
        text: "SKIP AD",
        x: VIEW.width - VIEW.width / 6,
        y: pixelStartingPoint - 600,
        objectOptions: defaultObjectOptions,
      },
      // 90 degrees
      {
        type: "pink",
        text: "SKIP AD",
        x: VIEW.width / 1.9,
        y: pixelStartingPoint - 400,
        objectOptions: mergeObjects(defaultObjectOptions, {
          angle: DEGREE_60,
        }),
      },
      {
        type: "pink",
        text: "SKIP AD",
        x: VIEW.width / 2,
        y: pixelStartingPoint - 400,
        objectOptions: mergeObjects(defaultObjectOptions, {
          angle: -DEGREE_60,
        }),
      },
      {
        type: "pink",
        text: "SKIP AD",
        x: VIEW.width - VIEW.width / 3 + 50,
        y: pixelStartingPoint - 400,
        objectOptions: mergeObjects(defaultObjectOptions, {
          angle: DEGREE_60,
        }),
      },
      {
        type: "pink",
        text: "SKIP AD",
        x: VIEW.width - VIEW.width / 4,
        y: pixelStartingPoint - 400,
        objectOptions: mergeObjects(defaultObjectOptions, {
          angle: -DEGREE_60,
        }),
      },
      {
        type: "pink",
        text: "SKIP AD",
        x: VIEW.width - VIEW.width / 6,
        y: pixelStartingPoint - 400,
        objectOptions: mergeObjects(defaultObjectOptions, {
          angle: DEGREE_90,
        }),
      },
      // row
      {
        type: "pink",
        text: "SKIP AD",
        x: 250,
        y: pixelStartingPoint - 300,
        objectOptions: defaultObjectOptions,
      },
      {
        type: "pink",
        text: "SKIP AD",
        x: VIEW.width / 3,
        y: pixelStartingPoint - 300,
        objectOptions: defaultObjectOptions,
      },
      {
        type: "pink",
        text: "SKIP AD",
        x: VIEW.width / 1.9,
        y: pixelStartingPoint - 300,
        objectOptions: defaultObjectOptions,
      },
      {
        type: "pink",
        text: "SKIP AD",
        x: VIEW.width - VIEW.width / 3 + 50,
        y: pixelStartingPoint - 200,
        objectOptions: defaultObjectOptions,
      },
      {
        type: "pink",
        text: "SKIP AD",
        x: VIEW.width - VIEW.width / 4,
        y: pixelStartingPoint - 200,
        objectOptions: defaultObjectOptions,
      },
      {
        type: "pink",
        text: "SKIP AD",
        x: VIEW.width - VIEW.width / 6,
        y: pixelStartingPoint - 200,
        objectOptions: mergeObjects(defaultObjectOptions, {
          angle: DEGREE_45,
        }),
      },
      // green boxes
      {
        type: "green",
        text: "NO WONDER",
        x: 250,
        y: pixelStartingPoint - 100,
        objectOptions: defaultObjectOptions,
      },
      {
        type: "green",
        text: "THE SKIP",
        x: VIEW.width / 3,
        y: pixelStartingPoint - 100,
        objectOptions: defaultObjectOptions,
      },
      {
        type: "green",
        text: "BUTTON",
        x: VIEW.width / 1.95,
        y: pixelStartingPoint - 100,
        objectOptions: defaultObjectOptions,
      },
      {
        type: "green",
        text: "IS THE MOST",
        x: VIEW.width / 2,
        y: pixelStartingPoint,
        objectOptions: defaultObjectOptions,
      },
      {
        type: "green",
        text: "POPULAR",
        x: VIEW.width - VIEW.width / 3 + 50,
        y: pixelStartingPoint + 100,
        objectOptions: defaultObjectOptions,
      },
      {
        type: "green",
        text: "BUTTON",
        x: VIEW.width - VIEW.width / 4,
        y: pixelStartingPoint + 200,
        objectOptions: defaultObjectOptions,
      },
      {
        type: "green",
        text: "EVER",
        x: VIEW.width - VIEW.width / 6,
        y: pixelStartingPoint + 200,
        objectOptions: defaultObjectOptions,
      },
      // pink boxes under the green ones
      {
        type: "pink",
        text: "SKIP AD",
        x: VIEW.width - VIEW.width / 3,
        y: pixelStartingPoint + 300,
        objectOptions: mergeObjects(defaultObjectOptions, {
          angle: DEGREE_225,
        }),
      },
      {
        type: "pink",
        text: "SKIP AD",
        x: VIEW.width - VIEW.width / 2.25,
        y: pixelStartingPoint + 400,
        objectOptions: defaultObjectOptions,
      },
      {
        type: "pink",
        text: "SKIP AD",
        x: VIEW.width - VIEW.width / 2.25,
        y: pixelStartingPoint + 300,
        objectOptions: defaultObjectOptions,
      },
      {
        type: "pink",
        text: "SKIP AD",
        x: VIEW.width - VIEW.width / 2.25,
        y: pixelStartingPoint + 400,
        objectOptions: mergeObjects(defaultObjectOptions, {
          angle: DEGREE_180,
        }),
      },
      {
        type: "pink",
        text: "SKIP AD",
        x: VIEW.width - VIEW.width / 1.5,
        y: pixelStartingPoint + 400,
        objectOptions: defaultObjectOptions,
      },
      {
        type: "pink",
        text: "SKIP AD",
        x: VIEW.width - VIEW.width / 1.5,
        y: pixelStartingPoint + 300,
        objectOptions: defaultObjectOptions,
      },
      {
        type: "pink",
        text: "SKIP AD",
        x: VIEW.width - VIEW.width / 1.5,
        y: pixelStartingPoint + 400,
        objectOptions: mergeObjects(defaultObjectOptions, {
          angle: DEGREE_180,
        }),
      },
      // 90 degrees
      {
        type: "pink",
        text: "SKIP AD",
        x: 100,
        y: pixelStartingPoint + 200,
        objectOptions: mergeObjects(defaultObjectOptions, {
          angle: -DEGREE_90,
        }),
      },
      {
        type: "pink",
        text: "SKIP AD",
        x: 200,
        y: pixelStartingPoint + 200,
        objectOptions: mergeObjects(defaultObjectOptions, {
          angle: -DEGREE_225,
        }),
      },
      {
        type: "pink",
        text: "SKIP AD",
        x: 300,
        y: pixelStartingPoint + 200,
        objectOptions: mergeObjects(defaultObjectOptions, {
          angle: -DEGREE_60,
        }),
      },
      // over 90 degrees
      {
        type: "pink",
        text: "SKIP AD",
        x: 200,
        y: pixelStartingPoint,
        objectOptions: defaultObjectOptions,
      },
      {
        type: "pink",
        text: "SKIP AD",
        x: 300,
        y: pixelStartingPoint,
        objectOptions: defaultObjectOptions,
      },
    ];
  }

  var bodies = [];

  boxesToRender.forEach((boxOptions, i) => {
    var elementText = boxOptions.text;

    if (boxOptions.type === "pink") {
      elementText =
        boxOptions.text +
        '<svg xmlns="http://www.w3.org/2000/svg"version="1.1"viewBox="0 0 62 63"><polygon fill="#f4c6a2" points=".9 62.4 .9 .6 49.9 31.5 .9 62.4" /><rect fill="#f4c6a2" x="51.7" y=".6" width="9.5" height="61.8" /></svg>';
    }

    var bodyElement = insertAsFirstChild(
      "div",
      containerBoxes,
      "<p>" + elementText + "</p>",
      ["box", "box--" + boxOptions.type],
      "box-" + i,
      {
        opacity: 0, // hide it cause the setTimeout will make it visible in the top left corner
      }
    );

    boxOptions.element = bodyElement;
  });

  // Wait till the css is applied to the new created elements
  setTimeout(function () {
    boxesToRender.forEach((boxOptions, i) => {
      var radius = 0;

      if (boxOptions.type === "green") {
        if (VIEW.width > 300 && VIEW.width < 768) {
          radius = 18;
        } else if (VIEW.width >= 768 && VIEW.width < 1025) {
          radius = 40;
        } else if (VIEW.width >= 1025 && VIEW.width < 1400) {
          radius = 40;
        } else if (VIEW.width >= 1280 && VIEW.width < 1400) {
          radius = 40;
        } else if (VIEW.width >= 1400) {
          radius = 40;
        }
      }

      var boxPositionInfo = boxOptions.element.getBoundingClientRect(),
        bodyDomWidth = boxPositionInfo.width,
        bodyDomHeight = boxPositionInfo.height;

      var body = Bodies.rectangle(
        boxOptions.x,
        boxOptions.y,
        bodyDomWidth,
        bodyDomHeight,
        deepMerge(
          {},
          {
            ...defaultObjectOptions,
            chamfer: { radius },
            angle: boxOptions.objectOptions.angle,
          }
        )
      );

      body.id = "box-" + i;

      bodies.push(body);

      boxOptions.element.style.opacity = 1; // make the element visible again
    });

    World.add(engine.world, bodies);

    var bodiesDom = document.querySelectorAll(".box");

    (function update() {
      window.requestAnimationFrame(update);

      for (var i = 0, l = bodiesDom.length; i < l; i++) {
        var bodyDom = bodiesDom[i],
          body = null;

        for (var j = 0, k = bodies.length; j < k; j++) {
          if (bodies[j].id == bodyDom.id) {
            body = bodies[j];
            break;
          }
        }

        if (body === null) continue;

        bodyDom.style.transform =
          "translate( " +
          (body.position.x - bodyDom.offsetWidth / 2) +
          "px, " +
          (body.position.y - bodyDom.offsetHeight / 2) +
          "px )";
        bodyDom.style.transform += "rotate( " + body.angle + "rad )";
      }
    })();
  }, 500);
});

/*
 * Helper functions
 */

function insertAsFirstChild(
  newElementTag,
  referenceElement,
  newElementHTML = "",
  classList = [],
  elementId,
  styles = {}
) {
  const newElement = document.createElement(newElementTag);
  newElement.innerHTML = newElementHTML;

  if (Array.isArray(classList) && classList.length > 0) {
    newElement.classList.add(...classList);
  }

  if (elementId) {
    newElement.id = elementId;
  }

  if (styles && typeof styles === "object") {
    for (const property in styles) {
      if (styles.hasOwnProperty(property)) {
        newElement.style[property] = styles[property];
      }
    }
  }

  referenceElement.prepend(newElement);

  return newElement;
}

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
function deepMerge(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepMerge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return deepMerge(target, ...sources);
}

function mergeObjects(obj1, obj2) {
  return Object.assign({}, obj1, obj2);
}
