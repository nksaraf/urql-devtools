import React, { FC, useCallback } from "react";
import styled from "styled-components";

type PrismLanguage = "json" | "graphql";

export const CodeHighlight: FC<{
  code: string;
  language: PrismLanguage;
}> = ({ code, language }) => {
  const handleRef = useCallback(
    (ref) => {
      if (ref === null) {
        return;
      }

      // Run prism on element (in web worker/async)
      Prism.highlightElement(ref, true);
    },
    [language]
  );

  return (
    <StyledCodeBlock
      ref={handleRef}
      className={`language language-${language}`}
    >
      <code>{code}</code>
    </StyledCodeBlock>
  );
};
CodeHighlight.displayName = "CodeHighlight";

export const InlineCodeHighlight: FC<{
  code: string;
  language: PrismLanguage;
}> = ({ code, language }) => {
  const handleRef = useCallback(
    (ref) => {
      if (ref === null) {
        return;
      }

      // Run prism on element (sync)
      Prism.highlightElement(ref, false);
    },
    [language]
  );

  return (
    <StyledInlineBlock
      ref={handleRef}
      className={`language language-${language}`}
    >
      <code>{code}</code>
    </StyledInlineBlock>
  );
};

export const StyledInlineBlock = styled.pre`
  display: inline-flex;
  margin: 0 !important;
  padding: 0 !important;
  background-color: none !important;
  background: none !important;

  & > code > div {
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

const StyledCodeBlock = styled.pre`
  background: ${(props) => props.theme.dark["+2"]} !important;
  font-size: 12px !important;
`;
