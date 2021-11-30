import styled from "styled-components";
import { color } from "../../lib/theme/mixin";

export const PreferencesWrapper = styled.div`
  width: 100%;
  background-color: ${color("background1")};
  .itemThemes {
    width: auto;
    height: auto;
    display: grid;
    grid-template-columns: 1fr 2fr;
    margin-top: 40px;
    padding: 40px;
  }
  .itemItem {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
  .listSmall {
    cursor: pointer;
    height: 100px;
    justify-content: center;
    align-items: center;
    display: flex;
    &.active {
      border: 2px blue solid;
    }
  }
  .textIntro {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: start;
  }
  .classLanguage {
    margin: 0;
    padding: 20px;
    cursor: pointer;
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding-left: 50px;
    font-weight: bold;
  }
  .listInput {
    display: flex;
  }
  .form-control {
    padding: 15px;
    border-radius: 10px;
  }
  .showTextInput {
    width: 100%;
    align-items: center;
    display: flex;
  }
  .labels {
    margin-right: 20px;
  }
  .showEmail {
    margin-top: 50px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .textSave {
    margin-left: 50px;
    padding: 15px;
  }
  .change-langues-option {
    display: grid;
    grid-auto-columns: 200px 200px;
    gap: 20px;
  }
`;
