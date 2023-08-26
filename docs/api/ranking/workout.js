module.exports = {
    "/wR": {
      get: {
        tags: ["Ranking Controller"],
        summary: "헬스 랭킹",
        description: "페이지 랜딩 (workout ranking -> wR)",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                properties: {
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    result: {
                      type: "object",
                      properties: {
                      },
                    },
                  },
                },
              },
            },
          },
          404: {
            description: '페이지를 찾을 수 없습니다.',
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    result: {
                      type: "object",
                      properties: {
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    post: {
        tags: ["Ranking Controller"],
        summary: "헬스 정보 전달",
        description: "",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                properties: {
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    result: {
                      type: "object",
                      properties: {
                      },
                    },
                  },
                },
              },
            },
          },
          401: {
            description: '페이지를 찾을 수 없습니다.',
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    result: {
                      type: "object",
                      properties: {
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },  
  },
  "/cR:id": {
    delete: {
      tags: ["Ranking Controller"],
      summary: "헬스 랭킹에서 삭제",
      description: "",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              properties: {
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  result: {
                    type: "object",
                    properties: {
                    },
                  },
                },
              },
            },
          },
        },
        404: {
          description: '페이지를 찾을 수 없습니다.',
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  result: {
                    type: "object",
                    properties: {
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};