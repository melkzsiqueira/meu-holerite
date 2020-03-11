import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Card, ListGroup } from 'react-bootstrap';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';
import { Form, SubmitButton, List, Owner } from './styles';
import avatar from '../../images/garoto.png';

export default class Main extends Component {
    state = {
        newRepo: '',
        repositories: [],
        loading: false,
    };

    componentDidMount(){
        const repositories = localStorage.getItem('repositories');

        if (repositories) {
            this.setState({ repositories: JSON.parse(repositories) });
        }
    }

    componentDidUpdate(_, prevState){
        const { repositories } = this.state;

        if (prevState.repositories !== repositories) {
            localStorage.setItem('repositories', JSON.stringify(repositories));
        }
    }

    handleInputChange = e => {
        this.setState({ newRepo: e.target.value });
    };

    handleSubmit = async e => {
        e.preventDefault();

        this.setState({ loading: true });

        const { newRepo, repositories } = this.state;
        const response = await api.get(`/repos/${newRepo}`, { timeout: 5000 });
        const data = {
            name: response.data.full_name,
        };

        this.setState({
            repositories: [...repositories, data],
            newRepo: '',
            loading: false,
        });
    };

    render() {
        const { newRepo, repositories, loading } = this.state;

        return (
            <Container>
                <Navbar>
                    <Navbar.Brand href="#home">
                        <b>Meu Holerite</b>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Logado como: <a href="#login">Melkz Siqueira</a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>
                <Owner>
                    <img src={avatar}/>
                    <h1>Melkz Siqueira</h1>
                    <p>Desenvolvedor Pleno</p>
                </Owner>

                <List>
                    <Card>
                        <Card.Header><b>PROVENTOS</b></Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Cras justo odio</ListGroup.Item>
                            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                        </ListGroup>
                    </Card>

                    <br></br>

                    <Card>
                        <Card.Header><b>DESCONTOS</b></Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Cras justo odio</ListGroup.Item>
                            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </List>
            </Container>
        );
    }
}
