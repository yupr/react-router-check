import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Test from "./test";

describe("App Component", () => {
  it("should render the component correctly", () => {
    render(<Test />);

    // 見出しが正しく表示されているか
    expect(
      screen.getByRole("heading", { name: /React Testing Demo/i })
    ).toBeInTheDocument();
    // 初期カウントが0であるか
    expect(screen.getByText("Count: 0")).toBeInTheDocument();
  });

  it("should increment the count when the button is clicked", async () => {
    const user = userEvent.setup();
    render(<Test />);

    const button = screen.getByRole("button", { name: /Increment/i });

    // ボタンをクリック
    await user.click(button);

    // カウントが1になっているか
    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });
});
