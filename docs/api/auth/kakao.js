module.exports = {
    "/auth/kakao": {
      get: {
        tags: ["AuthLogin"],
        summary: "사용자 kakao로그인",
        description: "사용자 회원가입(email, password, phone)",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                properties: {
                  email: {
                    type: "string",
                    description: "사용자 이메일",
                    example: "aaa@example.com",
                  },
                  password: {
                    type: "string",
                    description: "사용자 패스워드",
                    example: "123456789",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "사용자 kakao로그인 성공",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    result: {
                      type: "object",
                      properties: {
                        code: {
                          type: "number",
                          description: "code",
                          example: 200,
                        },
                        message: {
                          type: "string",
                          description: "성공 메시지",
                          example: "success",
                        },
                        data: {
                          type: "array",
                          description: "data",
                          example: [],
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
    },
  };
  