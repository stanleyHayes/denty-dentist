import React, {useEffect, useState} from "react";
import {Col, Row} from "rsuite"
import Layout from "../../components/layout/Layout";
import axios from "axios";
import {Tab, Tabs, Container} from "react-bootstrap";
import ArticleItem from "./ArticleItem";

function ArticlesPage(props) {

    const [myArticles, setMyArticles] = useState([]);
    const [articles, setArticles] = useState([]);
    const [userID, setUserID] = useState(localStorage.getItem("user_id") || null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [tabKey, setTabKey] = useState("all");

    function handleTabSelect(keyEvent, event) {
        setTabKey(keyEvent);
    }

    useEffect(function () {
        axios({
            url: "http://localhost:5000/api/v1/articles",
            method: "get",
            headers: {Authorization: `Bearer ${token}`}
        }).then(function (response) {
            setArticles(response.data.articles);
        }).catch(function (error) {
            console.log(error);
        });
    }, [articles]);

    useEffect(function () {
        axios({
            url: `http://localhost:5000/api/v1/articles?author=${userID}`,
            method: "get",
            headers: {Authorization: `Bearer ${token}`}
        }).then(function (response) {
            setMyArticles(response.data.articles);
        }).catch(function (error) {
            console.log(error);
        });
    }, [myArticles]);


    return (
        <Layout>
            <Container>
                <Tabs
                    className="my-3"
                    id="articles"
                    activeKey={tabKey}
                    onSelect={handleTabSelect}
                    defaultActiveKey="all"
                    variant="tabs">

                    <Tab title="Articles" eventKey="all">
                        <Row className="my-2">
                            {
                                (articles.length === 0) ? (
                                        <Col style={{
                                            minHeight: "85vh",
                                            backgroundColor: "whitesmoke",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}>
                                            <h5 style={{color: "#999"}}>No Articles</h5>
                                        </Col>
                                    ) :
                                    (
                                        articles.map(function (article, index) {
                                            return (
                                                <Col className="my-2" xs={24} md={12} lg={8} key={index}>
                                                    <ArticleItem article={article}/>
                                                </Col>
                                            )
                                        })
                                    )
                            }
                        </Row>
                    </Tab>
                    <Tab title="My Articles" eventKey="my_articles">
                        <Row className="my-2">
                            {
                                (myArticles.length === 0) ? (
                                        <Col style={{
                                            minHeight: "85vh",
                                            backgroundColor: "whitesmoke",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}>
                                            <h5 style={{color: "#999"}}>No Authored Articles</h5>
                                        </Col>
                                    ) :
                                    (
                                        myArticles.map(function (article, index) {
                                            return (
                                                <Col className="my-2" xs={24} md={12} lg={8} key={index}>
                                                    <ArticleItem article={article}/>
                                                </Col>
                                            )
                                        })
                                    )
                            }
                        </Row>
                    </Tab>
                </Tabs>
            </Container>
        </Layout>
    )
}

export default ArticlesPage;