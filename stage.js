/* stage.js */
window.stages = [
  { level: 1,  foodRequired: 5,  speed: 150, obstacles: [] },
  { level: 2,  foodRequired: 5,  speed: 140, obstacles: [ {x:10, y:10, w:4, h:1} ] },
  { level: 3,  foodRequired: 5,  speed: 130, obstacles: [ {x:8,  y:8,  w:3, h:2}, {x:20, y:15, w:2, h:3} ] },
  { level: 4,  foodRequired: 6,  speed: 120, obstacles: [ {x:5,  y:5,  w:3, h:2}, {x:15, y:10, w:4, h:1} ] },
  { level: 5,  foodRequired: 6,  speed: 110, obstacles: [ {x:3,  y:3,  w:5, h:1}, {x:20, y:8,  w:3, h:2} ] },
  { level: 6,  foodRequired: 7,  speed: 100, obstacles: [ {x:6,  y:12, w:4, h:1}, {x:12, y:6,  w:2, h:3}, {x:18, y:15, w:3, h:2} ] },
  { level: 7,  foodRequired: 7,  speed: 90,  obstacles: [ {x:0,  y:10, w:3, h:2}, {x:15, y:7,  w:4, h:1}, {x:25, y:12, w:2, h:2} ] },
  { level: 8,  foodRequired: 8,  speed: 80,  obstacles: [ {x:5,  y:5,  w:3, h:3}, {x:12, y:10, w:3, h:2}, {x:20, y:8,  w:4, h:1} ] },
  { level: 9,  foodRequired: 8,  speed: 70,  obstacles: [ {x:4,  y:4,  w:4, h:2}, {x:14, y:10, w:3, h:3}, {x:22, y:6,  w:3, h:2} ] },
  { level: 10, foodRequired: 10, speed: 60,  obstacles: [ {x:2,  y:2,  w:4, h:4}, {x:10, y:8,  w:3, h:3}, {x:18, y:5,  w:4, h:2}, {x:24, y:12, w:3, h:2} ] },
  { level: 11, foodRequired: 10, speed: 55, obstacles: [ {x:1,  y:1,  w:5, h:2}, {x:12, y:9,  w:3, h:3}, {x:20, y:4,  w:4, h:2} ] },
  { level: 12, foodRequired: 11, speed: 50, obstacles: [ {x:4,  y:6,  w:4, h:2}, {x:16, y:7,  w:3, h:3}, {x:22, y:10, w:2, h:2} ] },
  { level: 13, foodRequired: 11, speed: 48, obstacles: [ {x:3,  y:3,  w:4, h:4}, {x:15, y:8,  w:3, h:2}, {x:25, y:10, w:3, h:2} ] },
  { level: 14, foodRequired: 12, speed: 46, obstacles: [ {x:6,  y:2,  w:3, h:3}, {x:14, y:6,  w:4, h:2}, {x:20, y:12, w:2, h:2} ] },
  { level: 15, foodRequired: 12, speed: 44, obstacles: [ {x:2,  y:8,  w:4, h:2}, {x:12, y:4,  w:3, h:3}, {x:18, y:8,  w:3, h:2}, {x:25, y:5,  w:2, h:3} ] },
  { level: 16, foodRequired: 13, speed: 42, obstacles: [ {x:1,  y:10, w:4, h:2}, {x:10, y:3,  w:3, h:3}, {x:20, y:6,  w:4, h:2} ] },
  { level: 17, foodRequired: 13, speed: 40, obstacles: [ {x:5,  y:5,  w:4, h:2}, {x:15, y:4,  w:3, h:3}, {x:22, y:8,  w:3, h:2} ] },
  { level: 18, foodRequired: 14, speed: 38, obstacles: [ {x:3,  y:2,  w:5, h:2}, {x:14, y:7,  w:3, h:3}, {x:24, y:9,  w:2, h:2} ] },
  { level: 19, foodRequired: 14, speed: 35, obstacles: [ {x:2,  y:2,  w:3, h:4}, {x:12, y:8,  w:4, h:2}, {x:20, y:5,  w:3, h:2} ] },
  { level: 20, foodRequired: 15, speed: 30, obstacles: [ {x:1,  y:1,  w:5, h:5}, {x:10, y:6,  w:4, h:3}, {x:18, y:4,  w:4, h:2}, {x:26, y:10, w:3, h:3} ] }
];
