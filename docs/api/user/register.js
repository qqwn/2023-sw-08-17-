module.exports = {
    "/register": {
      post: {
        tags: ["User Controller"],
        summary: "사용자 회원가입 페이지",
        description: "사용자 회원가입(id, password, email, name)",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                properties: {
                  username: {
                    type: "string",
                    description: "사용자 id",
                    example: "qwer1234",
                  },
                  password: {
                    type: "string",
                    description: "사용자 패스워드",
                    example: "123456789",
                  },
                  name: {
                      type: 'String',
                      description: "사용자 이름"
                  },
                  email: {
                    type: "string",
                    description: "사용자 이메일",
                    example: "1234@email.com",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "사용자 회원가입 성공",
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
          401: {
            description: '회원가입 실패',
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
                          example: 401,
                        },
                        message: {
                          type: "string",
                          description: "실패 메시지",
                          example: "fail",
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
  