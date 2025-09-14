import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/image.jpg", () => {
    return new HttpResponse(null, {
      status: 200,
      headers: {
        "Content-Type": "image/jpeg",
      },
    });
  }),

  http.get("https://api.example.com/user", () => {
    return HttpResponse.json({
      id: "abc-123",
      firstName: "John",
      lastName: "Maverick",
    });
  }),
];
