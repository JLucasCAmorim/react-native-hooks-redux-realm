import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Container,
  Name,
  Description,
  Stats,
  Stat,
  StatCount,
  Refresh,
  RefreshText,
  Trash,
  TrashText,
  ContentButtons,
} from './styles';


// eslint-disable-next-line react/prop-types
export default function Repository({ data, onRefresh, onDelete }) {
  return (
    <Container>
      <Name>{data.name}</Name>
      <Description>{data.description}</Description>
      <Stats>
        <Stat>
          <Icon name="star" size={16} color="#333" />
          <StatCount>{data.stars}</StatCount>
        </Stat>
        <Stat>
          <Icon name="code-fork" size={16} color="#333" />
          <StatCount>{data.forks}</StatCount>
        </Stat>
      </Stats>
      <ContentButtons>
        <Refresh onPress={onRefresh}>
          <Icon name="refresh" color="#7159c1" size={16} />
          <RefreshText>ATUALIZAR</RefreshText>
        </Refresh>
        <Trash onPress={onDelete}>
          <Icon name="trash" color="#7159c1" size={16} />
          <TrashText>DELETAR</TrashText>
        </Trash>
      </ContentButtons>
    </Container>
  );
}
