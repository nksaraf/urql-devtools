import React, { useState, useCallback, FC, ComponentProps } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { Collapsible } from "../../../components";
import { useTimelineContext } from "../../../context";

export const Settings: FC<ComponentProps<typeof Container>> = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const handleExpandToggle = useCallback(() => setCollapsed((c) => !c), []);

  return (
    <Container {...props}>
      <Icon icon={faCog} onClick={handleExpandToggle} />
      <Content collapsed={collapsed}>
        <Filter />
      </Content>
    </Container>
  );
};

export const Filter: FC<ComponentProps<typeof FilterList>> = (props) => {
  const { exchanges, filter, setFilter } = useTimelineContext();

  const handleFilterToggle = useCallback(
    (v: string) => () =>
      setFilter((state) => ({
        ...state,
        source: state.source.includes(v)
          ? state.source.filter((f) => f !== v)
          : [...state.source, v],
      })),
    [setFilter]
  );

  return (
    <FilterList {...props}>
      {exchanges.map((e) => (
        <FilterButton
          key={e}
          role="checkbox"
          aria-selected={filter.source.includes(e)}
          onClick={handleFilterToggle(e)}
        >
          {e.replace(/Exchange$/, "")}
        </FilterButton>
      ))}
    </FilterList>
  );
};

const FilterList = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
`;

const FilterButton = styled.button`
  background: ${(props) => props.theme.dark["+6"]};
  color: ${(p) => p.theme.grey["0"]};
  padding: 5px 10px;
  border: none;
  font-size: 12px;
  margin: 5px;
  border-radius: 2px;
  font-weight: bold;
  cursor: pointer;
  outline: none;

  &[aria-selected="true"] {
    background: ${(p) => p.theme.light["0"]};
    color: ${(p) => p.theme.dark["0"]};
  }
`;

const Icon = styled(FontAwesomeIcon)`
  cursor: pointer;
  color: ${(p) => p.theme.light["-7"]};
  font-size: 14px;
  margin: 3px;

  &:hover {
    color: ${(p) => p.theme.light["0"]};
  }

  &:active {
    color: ${(p) => p.theme.light["-5"]};
  }
`;

const Content = styled(Collapsible)`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  transition: max-height 300ms ease;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 5px 10px;
  background: ${(props) => props.theme.dark["0"]};
  border-bottom: solid 1px ${(p) => p.theme.dark["+4"]};
`;
