// ========== PROMPT GENERATOR CLASS ==========
class PromptGenerator {
    constructor() {
        this.visualJsonExamples = {
            graph: `{
  "theme": {
    "--bg-color": "#0a0f1f",
    "--surface-color": "#131829",
    "--primary-color": "#ff6b35",
    "--text-color": "#ffffff"
  },
  "sceneOrder": [
    "intro",
    "line_hindi",
    "bar_english",
    "pie_hindi",
    "radar_english",
    "scatter_hindi",
    "bubble_english",
    "conclusion"
  ],
  "scenes": {
    "intro": {
      "id": "intro",
      "type": "title",
      "content": {
        "title": "Data Visualization Demo",
        "tts": {
          "locale": "en-IN",
          "text": "Welcome to this compact data visualization demonstration. We will alternate between Hindi and English narration to showcase multilingual support."
        }
      }
    },
    "line_hindi": {
      "id": "line_hindi",
      "type": "chart",
      "content": {
        "title": "रेखा चार्ट - मासिक बिक्री",
        "chartType": "line",
        "chartData": {
          "labels": [
            "जनवरी",
            "फरवरी",
            "मार्च",
            "अप्रैल",
            "मई",
            "जून"
          ],
          "datasets": [
            {
              "label": "बिक्री (लाख)",
              "data": [
                30,
                45,
                38,
                55,
                62,
                70
              ],
              "borderColor": "rgb(255, 107, 53)",
              "backgroundColor": "rgba(255, 107, 53, 0.2)",
              "borderWidth": 3,
              "fill": true,
              "tension": 0.4,
              "pointRadius": 6,
              "pointBackgroundColor": "rgb(255, 107, 53)"
            }
          ]
        },
        "chartOptions": {
          "responsive": true,
          "maintainAspectRatio": false,
          "plugins": {
            "legend": {
              "labels": {
                "color": "#ffffff",
                "font": {
                  "size": 14
                }
              }
            }
          },
          "scales": {
            "x": {
              "ticks": {
                "color": "#ffffff"
              },
              "grid": {
                "color": "rgba(255, 255, 255, 0.1)"
              }
            },
            "y": {
              "ticks": {
                "color": "#ffffff"
              },
              "grid": {
                "color": "rgba(255, 255, 255, 0.1)"
              }
            }
          }
        },
        "tts": {
          "locale": "hi-IN",
          "text": "यह रेखा चार्ट छह महीने की बिक्री दिखाता है। जनवरी में 30 लाख रुपये से शुरू करके, जून तक हमने 70 लाख रुपये की बिक्री हासिल की। यह 133 प्रतिशत की वृद्धि है।"
        }
      }
    },
    "bar_english": {
      "id": "bar_english",
      "type": "chart",
      "content": {
        "title": "Bar Chart - Team Performance",
        "chartType": "bar",
        "chartData": {
          "labels": [
            "Team A",
            "Team B",
            "Team C",
            "Team D"
          ],
          "datasets": [
            {
              "label": "Score",
              "data": [
                85,
                72,
                90,
                78
              ],
              "backgroundColor": [
                "rgba(255, 107, 53, 0.8)",
                "rgba(0, 217, 255, 0.8)",
                "rgba(50, 215, 75, 0.8)",
                "rgba(255, 217, 61, 0.8)"
              ],
              "borderWidth": 2,
              "borderRadius": 8
            }
          ]
        },
        "chartOptions": {
          "responsive": true,
          "maintainAspectRatio": false,
          "plugins": {
            "legend": {
              "display": false
            }
          },
          "scales": {
            "x": {
              "ticks": {
                "color": "#ffffff"
              },
              "grid": {
                "display": false
              }
            },
            "y": {
              "beginAtZero": true,
              "max": 100,
              "ticks": {
                "color": "#ffffff"
              },
              "grid": {
                "color": "rgba(255, 255, 255, 0.1)"
              }
            }
          }
        },
        "tts": {
          "locale": "en-IN",
          "text": "This bar chart displays team performance scores. Team C leads with 90 points shown in green. Team A scores 85 in orange. Team D has 78 points in yellow. Team B scored 72 in cyan."
        }
      }
    },
    "pie_hindi": {
      "id": "pie_hindi",
      "type": "chart",
      "content": {
        "title": "पाई चार्ट - बाजार वितरण",
        "chartType": "pie",
        "chartData": {
          "labels": [
            "उत्पाद A",
            "उत्पाद B",
            "उत्पाद C",
            "अन्य"
          ],
          "datasets": [
            {
              "data": [
                40,
                30,
                20,
                10
              ],
              "backgroundColor": [
                "rgba(255, 107, 53, 0.9)",
                "rgba(0, 217, 255, 0.9)",
                "rgba(255, 217, 61, 0.9)",
                "rgba(123, 97, 255, 0.9)"
              ],
              "borderWidth": 3,
              "borderColor": "#131829"
            }
          ]
        },
        "chartOptions": {
          "responsive": true,
          "maintainAspectRatio": false,
          "plugins": {
            "legend": {
              "position": "right",
              "labels": {
                "color": "#ffffff",
                "font": {
                  "size": 14
                }
              }
            }
          }
        },
        "tts": {
          "locale": "hi-IN",
          "text": "यह पाई चार्ट बाजार वितरण दिखाता है। उत्पाद ए 40 प्रतिशत हिस्सेदारी के साथ नारंगी रंग में है। उत्पाद बी 30 प्रतिशत नीले रंग में। उत्पाद सी 20 प्रतिशत पीले में। अन्य उत्पाद 10 प्रतिशत बैंगनी रंग में हैं।"
        }
      }
    },
    "radar_english": {
      "id": "radar_english",
      "type": "chart",
      "content": {
        "title": "Radar Chart - Skill Assessment",
        "chartType": "radar",
        "chartData": {
          "labels": [
            "Communication",
            "Technical",
            "Leadership",
            "Creativity",
            "Teamwork"
          ],
          "datasets": [
            {
              "label": "Employee Skills",
              "data": [
                85,
                90,
                75,
                80,
                88
              ],
              "backgroundColor": "rgba(255, 107, 53, 0.25)",
              "borderColor": "rgb(255, 107, 53)",
              "borderWidth": 3,
              "pointBackgroundColor": "rgb(255, 107, 53)",
              "pointRadius": 5
            }
          ]
        },
        "chartOptions": {
          "responsive": true,
          "maintainAspectRatio": false,
          "scales": {
            "r": {
              "beginAtZero": true,
              "max": 100,
              "ticks": {
                "color": "#ffffff",
                "backdropColor": "transparent"
              },
              "grid": {
                "color": "rgba(255, 255, 255, 0.15)"
              },
              "pointLabels": {
                "color": "#ffffff",
                "font": {
                  "size": 13
                }
              }
            }
          }
        },
        "tts": {
          "locale": "en-IN",
          "text": "The radar chart shows five skill dimensions. Technical skills score highest at 90 points. Teamwork follows at 88. Communication is at 85. Creativity scores 80. Leadership needs improvement at 75 points."
        }
      }
    },
    "scatter_hindi": {
      "id": "scatter_hindi",
      "type": "chart",
      "content": {
        "title": "स्कैटर चार्ट - उत्पाद स्थिति",
        "chartType": "scatter",
        "chartData": {
          "datasets": [
            {
              "label": "उत्पाद",
              "data": [
                {
                  "x": 45,
                  "y": 35
                },
                {
                  "x": -25,
                  "y": 40
                },
                {
                  "x": -30,
                  "y": -25
                },
                {
                  "x": 50,
                  "y": -15
                }
              ],
              "backgroundColor": [
                "rgba(255, 107, 53, 0.7)",
                "rgba(0, 217, 255, 0.7)",
                "rgba(255, 217, 61, 0.7)",
                "rgba(50, 215, 75, 0.7)"
              ],
              "pointRadius": 12,
              "pointHoverRadius": 15
            }
          ]
        },
        "chartOptions": {
          "responsive": true,
          "maintainAspectRatio": false,
          "scales": {
            "x": {
              "type": "linear",
              "position": "center",
              "min": -80,
              "max": 80,
              "title": {
                "display": true,
                "text": "बाजार परिवर्तन",
                "color": "#ffffff"
              },
              "ticks": {
                "color": "#ffffff"
              },
              "grid": {
                "color": "rgba(255, 255, 255, 0.15)",
                "lineWidth": 2
              }
            },
            "y": {
              "type": "linear",
              "position": "center",
              "min": -60,
              "max": 60,
              "title": {
                "display": true,
                "text": "राजस्व वृद्धि",
                "color": "#ffffff"
              },
              "ticks": {
                "color": "#ffffff"
              },
              "grid": {
                "color": "rgba(255, 255, 255, 0.15)",
                "lineWidth": 2
              }
            }
          }
        },
        "tts": {
          "locale": "hi-IN",
          "text": "यह चार चतुर्थांश विश्लेषण चार उत्पादों की स्थिति दिखाता है। नारंगी और हरे उत्पाद सकारात्मक वृद्धि दिखाते हैं। नीला उत्पाद उच्च राजस्व लेकिन बाजार हिस्सेदारी में कमी दिखाता है। पीला उत्पाद दोनों आयामों में नकारात्मक है।"
        }
      }
    },
    "bubble_english": {
      "id": "bubble_english",
      "type": "chart",
      "content": {
        "title": "Bubble Chart - Project Analysis",
        "chartType": "bubble",
        "chartData": {
          "datasets": [
            {
              "label": "Projects",
              "data": [
                {
                  "x": 70,
                  "y": 80,
                  "r": 25
                },
                {
                  "x": 45,
                  "y": 60,
                  "r": 15
                },
                {
                  "x": 85,
                  "y": 75,
                  "r": 30
                }
              ],
              "backgroundColor": [
                "rgba(255, 107, 53, 0.6)",
                "rgba(0, 217, 255, 0.6)",
                "rgba(50, 215, 75, 0.6)"
              ],
              "borderWidth": 2,
              "borderColor": "#ffffff"
            }
          ]
        },
        "chartOptions": {
          "responsive": true,
          "maintainAspectRatio": false,
          "scales": {
            "x": {
              "title": {
                "display": true,
                "text": "ROI (%)",
                "color": "#ffffff"
              },
              "ticks": {
                "color": "#ffffff"
              },
              "grid": {
                "color": "rgba(255, 255, 255, 0.1)"
              }
            },
            "y": {
              "title": {
                "display": true,
                "text": "Success Rate",
                "color": "#ffffff"
              },
              "ticks": {
                "color": "#ffffff"
              },
              "grid": {
                "color": "rgba(255, 255, 255, 0.1)"
              }
            }
          }
        },
        "tts": {
          "locale": "en-IN",
          "text": "The bubble chart analyzes three projects. Bubble size represents investment amount. The largest green project has 85 percent ROI and 75 percent success rate. Orange project shows 70 percent ROI with 80 percent success. The smallest cyan project has moderate returns."
        }
      }
    },
    "conclusion": {
      "id": "conclusion",
      "type": "end",
      "content": {
        "title": "धन्यवाद / Thank You",
        "tts": {
          "locale": "en-IN",
          "text": "Thank you for viewing this multilingual data visualization demonstration. We showcased seven different chart types with alternating Hindi and English narration."
        }
      }
    }
  }
}`,
            presentation: `{
"theme": {
"primary": "#007aff",
"accent": "#ff2d55",
"stage-bg": "#000000",
"text": "#ffffff",
"success": "#34c759",
"error": "#ff3b30",
"border-color": "#545458"
},
"backgroundCss": "radial-gradient(circle, #1e3a8a 0%, #000000 100%)",
"scenes": [
{
"id": "scene_splash_01",
"type": "title_splash",
"text": "DNA Replication",
"subtitle": "The Blueprint Copying Process of Life",
"imageUrl": "[https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=1280&auto=format&fit=crop&q=80](https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=1280&auto=format&fit=crop&q=80)",
"narration": "Welcome to this presentation on DNA replication — the fascinating biological process that ensures every new cell receives an exact copy of life's blueprint, the DNA molecule.",
"transition": {
"type": "zoom",
"duration": 800
}
},
{
"id": "scene_image_02",
"type": "image_showcase",
"caption": "DNA replication is the process by which a cell makes an identical copy of its DNA before cell division.",
"imageUrl": "[https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/DNA_replication_en.svg/1280px-DNA_replication_en.svg.png](https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/DNA_replication_en.svg/1280px-DNA_replication_en.svg.png)",
"narration": "At its core, DNA replication is about accuracy and precision. Each cell must duplicate its DNA so that when it divides, both daughter cells carry the same genetic code."
},
{
"id": "scene_barchart_03",
"type": "chart",
"text": "Enzyme Activity During Replication (%)",
"narration": "Various enzymes play key roles in DNA replication. This chart shows their relative activity levels during the process.",
"chartConfig": {
"type": "bar",
"data": {
"labels": ["Helicase", "Primase", "DNA Polymerase", "Ligase"],
"datasets": [
{
"label": "Relative Enzyme Activity",
"data": [90, 60, 100, 50],
"backgroundColor": ["#007aff", "#ff9500", "#34c759", "#ff2d55"]
}
]
},
"options": {
"scales": {
"y": {
"beginAtZero": true,
"max": 100
}
}
}
}
},
{
"id": "scene_timeline_04",
"type": "timeline",
"text": "Stages of DNA Replication",
"narration": "DNA replication occurs in three main stages: initiation, elongation, and termination. Each stage is crucial for accurate duplication.",
"events": [
{ "year": "Step 1", "title": "Initiation – DNA Unwinds at Origin" },
{ "year": "Step 2", "title": "Elongation – New Strands Are Synthesized" },
{ "year": "Step 3", "title": "Termination – Replication Completes and Proofreads" }
]
},
{
"id": "scene_comparison_05",
"type": "comparison",
"text": "Leading vs. Lagging Strands",
"leftTitle": "Leading Strand",
"leftPoints": ["Synthesized continuously", "Moves toward the replication fork", "Uses one primer"],
"rightTitle": "Lagging Strand",
"rightPoints": ["Synthesized in short fragments (Okazaki)", "Moves away from fork", "Requires multiple primers"],
"narration": "The DNA strands are antiparallel, meaning one is copied smoothly while the other is made in short fragments, both ensuring complete replication."
},
{
"id": "scene_donutchart_06",
"type": "chart",
"text": "Energy Usage in Replication",
"narration": "Replication consumes cellular energy in the form of ATP. Here is how energy is distributed across major steps.",
"chartConfig": {
"type": "doughnut",
"data": {
"labels": ["Helicase Action", "Polymerization", "Proofreading", "Ligase Sealing"],
"datasets": [
{
"data": [35, 40, 15, 10],
"backgroundColor": ["#34c759", "#007aff", "#ff9500", "#ff2d55"]
}
]
}
}
},
{
"id": "scene_network_07",
"type": "network",
"text": "Enzyme Coordination Network",
"narration": "Replication is teamwork at the molecular level. Enzymes like helicase, primase, polymerase, and ligase work in perfect coordination.",
"nodes": [
{ "id": "H", "label": "Helicase" },
{ "id": "P", "label": "Primase" },
{ "id": "D", "label": "DNA Polymerase" },
{ "id": "L", "label": "Ligase" }
],
"links": [
{ "from": "H", "to": "P" },
{ "from": "P", "to": "D" },
{ "from": "D", "to": "L" }
]
},
{
"id": "scene_code_08",
"type": "code",
"text": "Pseudo-code: DNA Replication Logic",
"language": "python",
"code": "def replicate_dna(dna_strand):\n    for base in dna_strand:\n        match = {'A':'T','T':'A','G':'C','C':'G'}\n        print(match[base], end='')\n\nreplicate_dna('ATGC')",
"narration": "Here’s a simple pseudo-code representation. Each base in DNA has a complement: A pairs with T, and G pairs with C. The program simulates how new strands are built."
},
{
"id": "scene_p5_09",
"type": "p5_js_3d",
"text": "3D Model of the DNA Double Helix",
"p5jsCode": "p.setup = function() {\n  p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);\n  p.pixelDensity(2);\n};\np.windowResized = function() {\n  p.resizeCanvas(p.windowWidth, p.windowHeight);\n};\np.draw = function() {\n  p.background(0);\n  p.orbitControl();\n  p.rotateY(p.frameCount * 0.01);\n  p.stroke(0, 255, 255);\n  p.noFill();\n  let spacing = 20;\n  let radius = Math.min(p.width, p.height) / 8;\n  let helixHeight = Math.min(p.height, p.width) / 1.5;\n  p.beginShape();\n  for (let i = -helixHeight; i < helixHeight; i += spacing) {\n    let angle = i * 0.1 + p.frameCount * 0.05;\n    let x = radius * p.cos(angle);\n    let y = i;\n    let z = radius * p.sin(angle);\n    p.vertex(x, y, z);\n  }\n  p.endShape();\n  p.stroke(255, 0, 255);\n  p.beginShape();\n  for (let i = -helixHeight; i < helixHeight; i += spacing) {\n    let angle = i * 0.1 + p.frameCount * 0.05 + p.PI;\n    let x = radius * p.cos(angle);\n    let y = i;\n    let z = radius * p.sin(angle);\n    p.vertex(x, y, z);\n  }\n  p.endShape();\n  p.stroke(255);\n  for (let i = -helixHeight; i < helixHeight; i += spacing) {\n    let angle1 = i * 0.1 + p.frameCount * 0.05;\n    let angle2 = angle1 + p.PI;\n    let x1 = radius * p.cos(angle1);\n    let z1 = radius * p.sin(angle1);\n    let x2 = radius * p.cos(angle2);\n    let z2 = radius * p.sin(angle2);\n    p.line(x1, i, z1, x2, i, z2);\n  }\n};",
"narration": "This 3D helix visualization represents the twisting beauty of DNA’s double structure — two strands linked by complementary bases."
},
{
"id": "scene_quote_10",
"type": "quote",
"quote": "DNA is like a computer program but far, far more advanced than any software ever created.",
"author": "Bill Gates",
"narration": "This quote reminds us how intricate and efficient DNA truly is — a natural code written billions of years ago, still running flawlessly today."
},
{
"id": "scene_quiz_11",
"type": "quiz",
"question": "Which enzyme joins Okazaki fragments on the lagging strand?",
"options": ["Helicase", "Ligase", "Primase", "Polymerase"],
"correctAnswer": 1,
"answerText": "Correct! DNA ligase seals the gaps between Okazaki fragments on the lagging strand.",
"narration": "Let’s check your understanding. Which enzyme is responsible for joining DNA fragments during replication?"
},
{
"id": "scene_bullets_12",
"type": "bullet_points",
"text": "Key Takeaways of DNA Replication",
"points": [
"Occurs before cell division",
"Is semi-conservative — each new DNA has one old strand",
"Involves several enzymes working in coordination",
"Ensures genetic stability and continuity"
],
"narration": "Before we conclude, here are the key points to remember. DNA replication ensures the faithful transmission of genetic information across generations."
},
{
"id": "scene_end_13",
"type": "end",
"text": "Thank You",
"subtitle": "DNA – The Code That Defines Life",
"imageUrl": "[https://images.unsplash.com/photo-1581092334426-ef6f88e2f4a5?w=1280&auto=format&fit=crop&q=80](https://images.unsplash.com/photo-1581092334426-ef6f88e2f4a5?w=1280&auto=format&fit=crop&q=80)",
"narration": "Thank you for exploring DNA replication with us. This process is at the heart of life’s continuity — the molecular bridge between generations."
}
]
}`,
            mindvoice: `{
      "id": "unique_snake_case_id",
      "title": "Concise Node Title",
      "notes": "A brief, one-sentence technical summary of the concept.",
      "script": "An engaging, conversational script for a podcast-style narration. Explain the concept clearly in 2-3 sentences as if talking to a student. Make it easy to understand.",
      "children": [ /* other nodes */ ]
    }`,
            chemistry: `{
  "mechanism": [
    {
      "step": 1,
      "title": "Nucleophilic Attack",
      "description": "The hydroxide ion (OH⁻) attacks the electrophilic carbon atom from the backside, forming a new C-O bond while breaking the C-Br bond.",
      "displayMolecules": ["substrate", "nucleophile"],
      "animationHints": [
        {
          "type": "curlyArrow",
          "from": "nucleophile:O1",
          "to": "substrate:C1",
          "flip": false
        }
      ]
    },
    {
      "step": 2,
      "title": "Transition State",
      "description": "A pentavalent transition state forms with partial bonds to both the incoming nucleophile and the leaving group.",
      "displayMolecules": ["transition-state"],
      "animationHints": []
    },
    {
      "step": 3,
      "title": "Product Formation",
      "description": "The C-Br bond breaks completely, bromide leaves as a leaving group, and the alcohol product is formed with inverted stereochemistry.",
      "displayMolecules": ["product", "bromide"],
      "animationHints": [
        {
          "type": "curlyArrow",
          "fromBond": "substrate:C1-Br1",
          "to": "bromide:Br1",
          "flip": false
        }
      ]
    }
  ],
  "molecules": {
    "substrate": {
      "position": { "x": 0, "y": 0 },
      "atoms": [
        { "id": "C1", "element": "C", "position": { "x": 0, "y": 0 }, "charge": 0 },
        { "id": "Br1", "element": "Br", "position": { "x": 60, "y": 0 }, "charge": 0 },
        { "id": "H1", "element": "H", "position": { "x": -30, "y": -30 }, "charge": 0 },
        { "id": "H2", "element": "H", "position": { "x": -30, "y": 30 }, "charge": 0 },
        { "id": "H3", "element": "H", "position": { "x": 0, "y": 35 }, "charge": 0 }
      ],
      "bonds": [
        { "id": "C1-Br1", "from": "C1", "to": "Br1", "type": "single" },
        { "id": "C1-H1", "from": "C1", "to": "H1", "type": "single" },
        { "id": "C1-H2", "from": "C1", "to": "H2", "type": "single" },
        { "id": "C1-H3", "from": "C1", "to": "H3", "type": "single" }
      ]
    },
    "nucleophile": {
      "position": { "x": -100, "y": 0 },
      "atoms": [
        { "id": "O1", "element": "O", "position": { "x": 0, "y": 0 }, "charge": -1 },
        { "id": "H4", "element": "H", "position": { "x": 0, "y": 25 }, "charge": 0 }
      ],
      "bonds": [
        { "id": "O1-H4", "from": "O1", "to": "H4", "type": "single" }
      ]
    },
    "transition-state": {
      "position": { "x": 0, "y": 0 },
      "atoms": [
        { "id": "C1", "element": "C", "position": { "x": 0, "y": 0 }, "charge": 0 },
        { "id": "O1", "element": "O", "position": { "x": -50, "y": 0 }, "charge": 0 },
        { "id": "Br1", "element": "Br", "position": { "x": 50, "y": 0 }, "charge": 0 },
        { "id": "H1", "element": "H", "position": { "x": -20, "y": -35 }, "charge": 0 },
        { "id": "H2", "element": "H", "position": { "x": -20, "y": 35 }, "charge": 0 },
        { "id": "H3", "element": "H", "position": { "x": 20, "y": 35 }, "charge": 0 },
        { "id": "H4", "element": "H", "position": { "x": -50, "y": 25 }, "charge": 0 }
      ],
      "bonds": [
        { "id": "C1-O1", "from": "C1", "to": "O1", "type": "dash" },
        { "id": "C1-Br1", "from": "C1", "to": "Br1", "type": "dash" },
        { "id": "C1-H1", "from": "C1", "to": "H1", "type": "single" },
        { "id": "C1-H2", "from": "C1", "to": "H2", "type": "single" },
        { "id": "C1-H3", "from": "C1", "to": "H3", "type": "single" },
        { "id": "O1-H4", "from": "O1", "to": "H4", "type": "single" }
      ]
    },
    "product": {
      "position": { "x": 0, "y": 0 },
      "atoms": [
        { "id": "C1", "element": "C", "position": { "x": 0, "y": 0 }, "charge": 0 },
        { "id": "O1", "element": "O", "position": { "x": -60, "y": 0 }, "charge": 0 },
        { "id": "H1", "element": "H", "position": { "x": 30, "y": -30 }, "charge": 0 },
        { "id": "H2", "element": "H", "position": { "x": 30, "y": 30 }, "charge": 0 },
        { "id": "H3", "element": "H", "position": { "x": 0, "y": 35 }, "charge": 0 },
        { "id": "H4", "element": "H", "position": { "x": -60, "y": 25 }, "charge": 0 }
      ],
      "bonds": [
        { "id": "C1-O1", "from": "C1", "to": "O1", "type": "single" },
        { "id": "C1-H1", "from": "C1", "to": "H1", "type": "single" },
        { "id": "C1-H2", "from": "C1", "to": "H2", "type": "single" },
        { "id": "C1-H3", "from": "C1", "to": "H3", "type": "single" },
        { "id": "O1-H4", "from": "O1", "to": "H4", "type": "single" }
      ]
    },
    "bromide": {
      "position": { "x": 100, "y": 0 },
      "atoms": [
        { "id": "Br1", "element": "Br", "position": { "x": 0, "y": 0 }, "charge": -1 }
      ],
      "bonds": []
    }
  }
}`
        };
    }

    generateWorkspaceStructure(syllabusText, languageText) {
        return `Based on the following syllabus/description, create a detailed course structure.

The subject should be a single, concise title.

The structure should be broken down into units, then chapters, then topics.

If a full syllabus is given → strictly follow its hierarchy.

If a single broad topic is given → create a logical roadmap to study it fully according Description-by-user .

Always use meaningful names/important-questions-as-names.

Ensure coverage of all important concepts.

The output must be in JSON format. Do not include any markdown formatting like \`\`\`json.

Syllabus/Description-by-user: "${syllabusText}"

Language for titles: ${languageText}

JSON format should be:

{
  "subject": "Subject Title",
  "units": [
    {
      "title": "Unit 1 Title",
      "chapters": [
        {
          "title": "Chapter 1.1 Title",
          "topics": [
            { "title": "Topic 1.1.1 Title", "objective": "learningObjective..." },
            { "title": "Topic 1.1.2 Title", "objective": "learningObjective..." }
          ]
        }
      ]
    }
  ]
}
`;
    }

    generateAutoContext(topicName, chapterName, unitName, workspaceName, templateType, visType, complexityLevel, contentLang, narrationLang, learningObjective) {
        return `Topic: "${topicName}"  
Chapter: "${chapterName}"  
Unit: "${unitName}"  
Workspace: "${workspaceName}"  
Diagram type: "${templateType}"  
Style: "${visType}"  
Concept complexity: ${complexityLevel}  
Slides and Description Language: "${contentLang}"  
Podcast Language: "${narrationLang}"  
Learning Objective: "${learningObjective}"  

Generate a 5-line professional response explaining:(nothing than the five line , no emojis) 
1️. The best way to showcase this topic using pro-level, code-based visualization with podcast integration.  
2️. The core and most important concepts or elements that must be highlighted for this topic.  
3️. The reasoning behind why this visualization style fits the topic.  
4️. How interactivity and podcast narration can enhance understanding.  
5️. A closing line that connects the visual and conceptual learning seamlessly.  
`;
    }

    generateBasePrompt(topicName, chapterName, unitName, workspaceName, complexityLevel, contentLang, narrationLang, learningObjective, contextText) {
        return `You are a universal topics teacher and and a pro frontend coder who teaches through video like visualization with narration .

${contextText}

Topic: "${topicName}"  
Chapter: "${chapterName}"  
Unit: "${unitName}"  
Workspace: "${workspaceName}"  
Concept complexity: ${complexityLevel}  
Slides and Description Language: "${contentLang}"  
Podcast Language: "${narrationLang}"  
Learning Objective: "${learningObjective}"  
More : [ ( Ignore these all time. Use only for generating a HTML visual. No HTML = No use .)
        Diagram type: "..."  Style: "..."  ]

Tailor explanation complexity based on complexityText = ${complexityLevel} ( Auto detect concept depth level by undergiven parameter )
[ Basic → Simple overview  | Intermediate → School-level explanation | Advanced → College-level detail | Expert → Graduate-level depth ]
If the topic includes a language name (e.g., "in Hindi", default: English), write the <description> in that/those language simply and clearly.

### Perfect! Here's the **ultra-compact version** in your exact style:

### 🔹 Output Format ( Always Follow Exactly. Add tags perfectly in start and end as like "<description>...</description>" and ...):

1. Description Section:

Rules:
- Only use tags: <description>, <page>, <p>, <strong>, <em>, <h3>, <table>, <tr>, <th>, <td>, <ol>, <ul>, <li>, <a>, <svg>, <math>, <code>
- Add lang="xx-IN" to the FIRST <strong> tag in every page (e.g., lang="bn-IN", lang="en-IN", lang="hi-IN")
- Colors allowed: #22C55E (Green), #0EA5E9 (Blue), #6D28D9 (Purple), #F97316 (Orange)
- <math> is OPTIONAL — use it ONLY if the topic includes formulas or calculations
- <code> is OPTIONAL — use it ONLY if the topic involves coding, programs, or examples
- Use ONLY Google search links (https://www.google.com/search?q=...)

<description>
  <page>
    <p><strong style="color:#22C55E" lang="bn-IN">[Page Title]</strong></p>
    <p>[Explanation with <strong>bold</strong> and <em>italic</em>]</p>
    <!-- SVG will be generated by AI -->
    <svg width="100%" height="180" viewBox="0 0 600 180">
    </svg>
    <table border="1">
      <tr>
        <th style="color:#22C55E">[Header 1]</th>
        <th style="color:#0EA5E9">[Header 2]</th>
      </tr>
      <tr>
        <td><strong>[Data]</strong></td>
        <td>[Data]</td>
      </tr>
    </table>
    <h3 style="color:#6D28D9">[Subsection]</h3>
    <ol>
      <li><strong>[Point]:</strong> Description</li>
    </ol>
    <ul>
      <li><strong>[Item]:</strong> Details</li>
    </ul>
    <p>
      Search Suggestion :  
      <a href="https://www.google.com/search?q=[topic]" target="_blank">[Link Text]</a>
    </p>
    <!-- OPTIONAL — use ONLY when topic needs formulas -->
    <math xmlns="http://www.w3.org/1998/Math/MathML">
      <!-- Leave empty unless needed -->
    </math>
    <!-- OPTIONAL — use ONLY for coding topics -->
    <code>
      <!-- Code goes here if required -->
    </code>
  </page>
  <page>
    <p><strong style="color:#0EA5E9" lang="en-IN">[Page 2 Title]</strong></p>
    <p>[Content...]</p>
    <svg width="100%" height="180" viewBox="0 0 600 180">
    </svg>
  </page>
  <!-- Add Page 3–6 following the same style -->
</description>
`;
    }

    generateContentPrompt(topicName, chapterName, unitName, workspaceName, complexityLevel, contentLang, narrationLang, learningObjective, contextText) {
        const basePrompt = this.generateBasePrompt(topicName, chapterName, unitName, workspaceName, complexityLevel, contentLang, narrationLang, learningObjective, contextText);

        const templateType = window.selectedTemplate || 'surprise-me'; 
        
        if (templateType === 'surprise-me') {
            return `${basePrompt}

2.HTML Visualization (p5.js + CSS): 
Generate a single HTML file using HTML, CSS, and p5.js for an ultra-high-fidelity visualization of "${topicName}".  
It should show all major parts/stages dynamically and responsively.
Theme (Glassmorphism):
:root {
  --bg-color: #0a0a10;
  --primary-color: #007bff;
  --glow-color: rgba(0, 123, 255, 0.7);
  --text-color: #f0f0f0;
  --glass-bg: rgba(25, 25, 40, 0.3);
  --glass-border: rgba(255, 255, 255, 0.15);
}
Controls:
Fixed buttons at bottom-right:
1. Replay → restarts only the animation without sound.
<button id="replay" class="control-button" title="Replay">⟳</button>
2. Podcast → starts/stops narration, resets visuals when starting.
<button id="podcast" class="control-button" title="Podcast">🎙️</button>
(while playing → changes to ❚❚ )

.control-button {
  position: fixed; bottom: 20px; width: 50px; height: 50px;
  border-radius: 50%; background: var(--glass-bg);
  backdrop-filter: blur(12px); border: 1px solid var(--glass-border);
  box-shadow: 0 8px 32px rgba(0,0,0,0.37);
  color: var(--text-color); font-size: 20px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.3s ease;
}
.control-button:hover { background: rgba(0,123,255,0.5); }
#replay { right: 80px; }
#podcast { 
    right: 20px; 
    background: linear-gradient(45deg, #FFD54F, #FF8C00);
    box-shadow: 0 4px 15px rgba(249, 115, 22, 0.4);
    color: #fff;
}

Narration :
- Narration uses SpeechSynthesis API
- Predefined and mapped narration script ( alternating male/female voices OR pitch/rate variation) as like podcast.
- Podcast button logic:
  - If narrating → stop immediately
  - If not → reset visuals + start narration
- Replay button only resets visuals without narration.
- Narration structured like interactive conversation.
- Highlight visual elements or indicating texts/pointing which are needed, in sync.

Do *not* explain or mention the code or technologies used.  
Avoid intros or endings like "Hello, we will learn…" — go straight into the concept.  
No captions or overlays that block visuals.  
Do not show labels like "Chapter", "Unit", or "Topic".  

The scene should feel like a clean, cinematic, concept-driven video — smooth, uninterrupted.
Optimize the code for smooth performance — use fewer calculations per second ( example: if it interactive /  3d / complex ), 
keep the frame rate below 30 FPS, and ensure a lightweight feel even if the HTML code is long.
Now, create a continuous 5-minute visual explanation of the topic.

Final response/output style:
( Do not include any type of heading, title, or summary — only these sections should appear. ) 
1. <description>...</description>
2. <!DOCTYPE html>
   <html lang="en">
        Output as a single full HTML code (HTML + CSS + p5.js).
   </html>

Think very long, carefully, and respond perfectly. 
`;
        } else {
            return `${basePrompt}

2.Visual JSON ${templateType} (auto slide count, professional, concise).
Here's JSON output example :
(There is no context with these json data its only for example to understant power and perfection of json structure)
<visualjson type="${templateType}" > ${this.visualJsonExamples[templateType] || '[Your JSON here]'} </visualjson>
`;
        }
    }

    generateFixPrompt(templateType, previousResponse, userComment, consoleErrors, topicName, chapterName, unitName, workspaceName, complexityLevel, contentLang, narrationLang, learningObjective, contextText) {
        
        const originalPrompt = this.generateContentPrompt(
            topicName, 
            chapterName, 
            unitName, 
            workspaceName, 
            complexityLevel, 
            contentLang, 
            narrationLang, 
            learningObjective, 
            contextText
        );

        if (templateType === 'surprise-me') {
            return `You are a P5.js HTML Visual Debugger, Modifier, Enhancer, and Repair Specialist — a true Teacher of "${topicName}",
deeply understanding the subject and capable of analyzing code-based visualizations, identifying visual or runtime issues,
enhancing animations, and refining UI behavior while ensuring the concept is taught clearly and accurately through the visualization.

Use the previous prompt and response to fix or update the output as per the **user's comment.**
Maintain the same structure and formatting of responce as the base prompt.
Resolve all console errors (if any) . Output only the corrected version with exact format of previous prompt showing.

User Comment:
"${userComment || "None"}"

Console Details:
${consoleErrors || "None"}

Previous Prompt:
${originalPrompt}

Previous Response:
${previousResponse}
`;
        } else {
            return `You are a Knowledge Teacher of "${topicName}" and a JSON Structuring Master — capable of explaining this topic with clarity,
generating precise JSON-based visual data structures for learning, and when needed, sometimes applying expert-level P5.js coding
to illustrate advanced concepts dynamically.

User Comment:
"${userComment || "None"}"

Use the previous prompt to fix or update the output as per the user's comment.
Maintain the same structure and formatting as the base prompt.
Output only the corrected version with exact format of previous prompt showing.

Previous Prompt:
${originalPrompt}

Previous Response:
${previousResponse}
`;
        }
    }

    generateQuizPrompt(topicName, chapterName, unitName, workspaceName, contentLang, learningObjective, descriptionContent, visualJsonData, questionCount = 5) {
        let visualContext = '';
        if (visualJsonData) {
            visualContext = JSON.stringify(visualJsonData, null, 2);
        }

        return `You are an advanced educational AI specializing in generating diverse multiple-choice quizzes (MCQs). The resulting JSON data will be used in an interactive interface that validates the 'answerIndex' and automatically shuffles the options during runtime.

Rules:
1. Output only a single valid JSON object.
2. Create exactly ${questionCount} questions.
3. Each question must have 4 distinct options.
4. **Crucial Validation:** Ensure the "answerIndex" is a zero-based integer (0, 1, 2, or 3) and correctly corresponds to the intended answer in the 'options' list. Questions with out-of-range indices will be automatically discarded by the application.
5. Scoring: Correct answer = +2 points, Wrong = -1 point.
6. Output only JSON, no explanations or text outside the structure.

CONTENT FORMATTING GUIDELINES (Use HTML/SVG tags within the 'question' and 'options' fields when necessary):
- For dedicated code snippets, wrap them in: <pre><code>...</code></pre>
- For inline code or math symbols, use: <code>...</code>
- For graphical questions (e.g., logic circuits, diagrams, flowcharts), generate the complete **compact SVG markup** directly into the 'question' or the relevant 'option' field.

Details:
Topic: "${topicName}"
Chapter: "${chapterName}"
Unit: "${unitName}"
Workspace: "${workspaceName}"
Language: "${contentLang}"
Learning Objective: "${learningObjective}"

Context for content generation:
--- Start Context ---
${descriptionContent || "No description provided."}
Visual Data (Use this for visual questions, outputting SVG when appropriate): 
${visualContext || "No visual data provided."}
--- End Context ---

Follow this exact structure:
<quiz>
{
  "questions": [
    {
      "question": "What is the key role of the enzyme Helicase in DNA Replication?",
      "options": [
        "Synthesizing the new strand.",
        "Joining Okazaki fragments.",
        "Unwinding the double helix.",
        "Proofreading the DNA."
      ],
      "answerIndex": 2
    }
  ]
}
</quiz>
Generate the quiz JSON now.
`;
    }
}