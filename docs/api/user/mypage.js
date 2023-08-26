module.exports = {
    "/user/:id": {
      get: {
        tags: ["User Controller"],
        summary: "로그인 사용자 페이지",
        description: "로그인 사용자 정보 페이지",
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
            description: "마이페이지 접속 성공",
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
            description: '마이페이지 불러오기 실패',
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