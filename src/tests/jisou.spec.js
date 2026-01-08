import { screen, render, waitFor, findAllByRole } from "@testing-library/react";
import testingLibraryUserEvent from "@testing-library/user-event";
import StudyRecord from "../StudyRecord";
import * as supabaseFn from "../utils/supabaseFuntion";

const initialDataList = [
  { id: 1, title: "作業1", time: 10 },
  { id: 2, title: "作業2", time: 20 },
  { id: 3, title: "作業3", time: 30 },
];

const userEvent = testingLibraryUserEvent.setup();

describe("JISOU課題", () => {
  const addDbRecordSpy = jest
    .spyOn(supabaseFn, "addDbRecord")
    .mockImplementation(({ title, time }) => ({
      id: 4,
      title,
      time,
    }));

  jest.spyOn(supabaseFn, "getAllRecords").mockImplementation(() => ({
    status: 200,
    data: initialDataList,
  }));

  jest.spyOn(supabaseFn, "deleteDbRecord").mockImplementation((id) => {});

  beforeEach(async () => {
    await waitFor(() => render(<StudyRecord />));
  });

  afterEach(() => {
    addDbRecordSpy.mockClear();
  });

  it("タイトル表示チェック", async () => {
    const h1 = await screen.findByRole("heading", { lebel: 1 });
    expect(h1.textContent).toBe("学習記録一覧");
  });

  it("レコード登録チェック", async () => {
    const contentField = await screen.findByRole("textbox", {
      name: /study-content/i,
    });

    const timeField = await screen.findByRole("spinbutton", {
      name: /study-time/i,
    });
    const buttonElem = await screen.findByRole("button", { name: "登録" });
    await userEvent.type(contentField, "JEST追加タスク");
    await userEvent.type(timeField, "99");
    await userEvent.click(buttonElem);

    const ulElem = await screen.findByRole("list");
    const liElems = ulElem.querySelectorAll("li");
    expect(liElems.length).toBe(4);
  });

  it("レコード登録_DB更新メソッドコール回数チェック", async () => {
    const contentField = await screen.findByRole("textbox", {
      name: /study-content/i,
    });

    const timeField = await screen.findByRole("spinbutton", {
      name: /study-time/i,
    });
    const buttonElem = await screen.findByRole("button", { name: "登録" });
    await userEvent.type(contentField, "JEST追加タスク");
    await userEvent.type(timeField, "99");
    await userEvent.click(buttonElem);
    expect(addDbRecordSpy).toHaveBeenCalledTimes(1);
  });

  it("レコード削除チェック", async () => {
    const ulElem = await screen.findByRole("list");
    const deleteButtonElems = await findAllByRole(ulElem, "button", {
      name: "削除",
    });

    await userEvent.click(deleteButtonElems[initialDataList.length - 1]);
    const liElems = ulElem.querySelectorAll("li");
    expect(liElems.length).toBe(2);
    liElems.forEach((x, i) => {
      const expectValue = `${initialDataList[i].title}${initialDataList[i].time}時間削除`;
      expect(x.textContent).toBe(expectValue);
    });
  });

  it("未入力登録_エラー表示チェック", async () => {
    const registerButtonElem = await screen.findByRole("button", {
      name: "登録",
    });

    await userEvent.click(registerButtonElem);

    const errorPElem = await screen.findByText(
      "入力されていない項目があります"
    );
    expect(errorPElem).toBeInTheDocument();
  });

  it("未入力登録_DB更新メソッド非コールチェック", async () => {
    const registerButtonElem = await screen.findByRole("button", {
      name: "登録",
    });
    await userEvent.click(registerButtonElem);
    expect(addDbRecordSpy).toHaveBeenCalledTimes(0);
  });
});
