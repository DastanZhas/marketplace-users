import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

export function Users() {
    const [users, setUsers] = useState("");
    const [loading, setLoading] = useState(true);

    const [searchInput, setSearchInput] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);

    const [sortButtonClicked, setSortButtonClicked] = useState(false);

    async function fetchData() {
        try {
            let response = await fetch(`https://randomuser.me/api/?results=150`)
            let data = await response.json();
            let results = data.results;

            setUsers(results);
            setLoading(false);
            // console.log(results);
            // console.log(results.sort((a,b) => a.name.first > b.name.first ? 1 : -1))
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    // Check if fetching the data from randomuser.me/api API is retrieved and only then rendering the page
    if (loading) {
        return (
            <div>Loading...</div>
        )
    }

    // Handling onChange event on input text to make search through the list of customers
    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = users.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData);
        }
        else {
            setFilteredResults(users)
        }
        console.log(searchInput);
    }

    // Handling button click to sort the names of the customers in alphabetical order.
    function onSortButtonClick(e) {
        // console.log(users.sort((a,b) => a.name.first > b.name.first ? 1 : -1))
        let sortedArray = users.sort((a, b) => a.name.first > b.name.first ? 1 : -1)
        setUsers(sortedArray);
        setSortButtonClicked(true);
        console.log(users);
    }

    // Handling button to refresh and re-render the list of the customers.
    function onRefreshButton() {
        fetchData();
    }


    return (
        <div>
            <div className='controlGroup'>
                <InputGroup className='searchbox'>
                    <InputGroup.Text>Поиск пользователей</InputGroup.Text>
                    <Form.Control as="textarea" aria-label="With textarea" onChange={(e) => searchItems(e.target.value)} />
                </InputGroup>

                <Button className='buttons' variant='primary' onClick={onSortButtonClick}>Сортировать по алфавитному порядку</Button>

                <Button className='buttons' variant='primary' onClick={onRefreshButton}>Обновить список</Button>
            </div>


            <div className='grids'>
                <div className='grid'>
                    {/* check if the search input text box is empty or not and rendering the content by value in textbox */}
                    {searchInput.length > 1 ? (
                        filteredResults.map(user => (
                            <Card className='box'>
                                <Card.Header as="h3">Пользователь</Card.Header>
                                <Card.Body>
                                    <Card.Img variant="top" src={user.picture.large} />
                                    <Card.Title className="names">{user.name.first}</Card.Title>
                                    <Button variant="primary">Подробнее</Button>
                                </Card.Body>
                            </Card>
                        ))
                    ) : (users.map(user => (
                        <Card className='box'>
                            <Card.Header as="h3">Пользователь</Card.Header>
                            <Card.Body>
                                <Card.Img variant="top" src={user.picture.large} />
                                <Card.Title className="names">{user.name.first}</Card.Title>
                                <Button variant="primary">Подробнее</Button>
                            </Card.Body>
                        </Card>
                    ))
                    )}
                </div>
            </div>
        </div>
    );
};