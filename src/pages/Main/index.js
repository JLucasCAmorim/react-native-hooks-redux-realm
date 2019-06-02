/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import repositoryActions from '~/store/ducks/repositories';
import Repository from '~/components/Repository';

import {
  Container, Title, Form, Input, Submit, List,
} from './styles';

const Main = ({
  list,
  error,
  getRepositoriesRequest,
  saveRepositoryRequest,
  updateRepositoryRequest,
  deleteRepositoryRequest,
}) => {
  const [input, setInput] = useState('');

  useEffect(() => {
    getRepositoriesRequest();
  }, []);

  function handleAddRepository() {
    saveRepositoryRequest(input);
    setInput('');
    Keyboard.dismiss();
  }

  function handleRefreshRepository(repository) {
    updateRepositoryRequest(repository.fullName);
  }

  function handleDeleteRepository(repository) {
    deleteRepositoryRequest(repository);
  }

  function handleItems(item) {
    return (
      <Repository
        data={item}
        onDelete={() => handleDeleteRepository(item)}
        onRefresh={() => handleRefreshRepository(item)}
      />
    );
  }

  return (
    <Container>
      <Title>Repositórios</Title>

      <Form>
        <Input
          value={input}
          error={error}
          onChangeText={setInput}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Procurar repositório..."
        />
        <Submit onPress={handleAddRepository}>
          <Icon name="add" size={22} color="#FFF" />
        </Submit>
      </Form>

      <List
        keyboardShouldPersistTaps="handled"
        data={list}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => handleItems(item)}
      />
    </Container>
  );
};

const mapStateToProps = ({ repositories }) => {
  const { list, error } = repositories;
  return {
    list,
    error,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators(repositoryActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
