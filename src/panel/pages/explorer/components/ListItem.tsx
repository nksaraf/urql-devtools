import React, { useContext, useMemo, useCallback, FC, useEffect } from "react";
import styled, { css } from "styled-components";
import { FieldNode } from "../../../context/Explorer/ast";
import { ExplorerContext } from "../../../context";
import { ArrowIcon } from "./Icons";
import { Arguments } from "./Arguments";
import { Value } from "./Value";
import { Tree } from "./Tree";

interface ListItemProps {
  node: FieldNode;
  depth?: number;
}

export const ListItem: FC<ListItemProps> = ({ node, depth = 0 }) => {
  const { focusedNode, setFocusedNode } = useContext(ExplorerContext);
  const isExpanded = useMemo(
    () => (focusedNode ? focusedNode._id === node._id : false),
    [node, focusedNode]
  );

  useEffect(() => {
    // Not focused or node hasn't changed
    if (!isExpanded || node === focusedNode) {
      return;
    }

    // Update focused node object
    setFocusedNode(node);
  }, [isExpanded, node, focusedNode]);

  const handleFieldContainerClick = useCallback(
    () => setFocusedNode(n => (n && n._id === node._id ? undefined : node)),
    [isExpanded, node]
  );

  const contents = (
    <>
      <Name>{node.name}</Name>
      <Arguments args={node.args} displayAll={isExpanded} />
      <Symbol>{`:`}</Symbol>
      <ValueWrapper>
        <Value
          value={node.children !== undefined ? node.children : node.value}
          expandValues
        />
      </ValueWrapper>
    </>
  );

  if (
    (Array.isArray(node.children) && node.children.length > 0) ||
    node.children
  ) {
    return (
      <Item role="treeitem" withChildren>
        <FieldContainer onClick={handleFieldContainerClick}>
          <OutlineContainer isActive={isExpanded}>
            <Arrow active={isExpanded} />
            <ChildrenName>{node.name}</ChildrenName>
            <Arguments args={node.args} displayAll={isExpanded} />
          </OutlineContainer>
        </FieldContainer>
        {isExpanded && <Tree nodeMap={node.children} depth={depth + 1} />}
      </Item>
    );
  }

  return (
    <Item role="treeitem" withChildren={false}>
      {node.args ? (
        <FieldContainer onClick={handleFieldContainerClick}>
          <OutlineContainer isActive={isExpanded}>{contents}</OutlineContainer>
        </FieldContainer>
      ) : (
        <>{contents}</>
      )}
    </Item>
  );
};

export const SystemListItem = ({
  node,
  index
}: {
  node: FieldNode;
  index?: number;
}) => (
  <Item withChildren={false}>
    <Typename>
      {`${node.value}`}
      {typeof index === "number" ? ` #${index}` : null}
    </Typename>
  </Item>
);

const ValueWrapper = styled.div`
  display: inline-block;
`;

const Item = styled.li`
  padding-left: ${({ withChildren }: { withChildren: boolean }) =>
    withChildren ? "0" : "1rem"};
  min-height: 1.4rem;
  line-height: 1.4rem;
  color: ${p => p.theme.grey["-1"]};
`;

const FieldContainer = styled.button`
  position: relative;
  width: 100%;
  padding: 0;
  margin: 0;
  padding-left: 1rem;
  background-color: transparent;
  border: none;
  outline: none;
  position: relative;
  min-height: 1.4rem;
  line-height: 1.4rem;
  cursor: pointer;

  color: ${p => p.theme.grey["-1"]};
  text-align: left;
  font-size: 14px;

  & > ${ValueWrapper} {
    display: inline-flex;
    width: min-content;
    flex-wrap: wrap;
  }
`;

const OutlineContainer = styled.div`
  position: absolute;
  bottom: 0;
  top: 0;
  left: -3px;
  width: 100%;

  padding-left: 3px;

  ${({ isActive }: { isActive: boolean }) =>
    isActive &&
    css`
      background-color: ${p => p.theme.dark["-1"]};
      outline: 1px dashed ${p => `${p.theme.pink["0"]}a0`};
      transition: all 0.3s linear;
    `};
`;

const Name = styled.span`
  color: ${p => p.theme.pink["0"]};
`;

const ChildrenName = styled.span`
  position: relative;
  margin-right: 3px;
  display: inline-block;
  color: ${p => p.theme.purple["+1"]};
  font-weight: bold;
  font-size: 14px;
`;

const Arrow = styled(ArrowIcon)`
  display: inline-block;
  height: 10px;
  width: 10px;

  margin-top: -4px;
  margin-left: 2px;
  margin-right: 5px;

  transform: ${({ active }: { active: boolean }) =>
    active ? "rotate(90deg)" : "rotate(0deg)"};
  color: ${p => (p.active ? p.theme.pink["+2"] : p.theme.grey["-1"])};
  transition: all 0.1s;
`;

const Typename = styled.div`
  display: inline-block;
  margin-left: -7px;
  margin-bottom: 0.15rem;
  margin-top: -0.1rem;
  padding: 3px 5px;
  border: 1px solid ${p => `${p.theme.grey["-1"]}50`};
  border-radius: 2px;
  background-color: ${p => p.theme.dark["-1"]};
  color: ${p => p.theme.grey["+2"]};
  font-size: 11px;
  line-height: 1rem;
`;

const Symbol = styled.span`
  color: ${p => p.theme.grey["-1"]};
  margin-right: 3px;
`;
