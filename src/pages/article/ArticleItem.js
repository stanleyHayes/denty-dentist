import React from "react";
import {Divider, List} from "rsuite";
import {Card} from "react-bootstrap";

function ArticleItem(props) {

    const styles = {
        title: {

        },
        date: {},
        author: {},
        caption: {}
    };
    return (
        <Card>
            <Card.Img src={props.article.image}/>
            <Card.Body>
                <small>Title</small>
                <p style={styles.title}>{props.article.title}</p>
            </Card.Body>

            <Divider/>

            <Card.Body>
                <small>Published Date</small>
                <p style={styles.date}>{new Date(props.article.published_date).toDateString()}</p>
            </Card.Body>
            <Divider/>

            <Card.Body>
                <small>Author</small>
                <p style={styles.author}>{props.article.author}</p>
            </Card.Body>

            <Divider/>

            <Card.Body>
                <small>Caption</small>
                <p style={styles.caption}>{new Date(props.article.caption).toDateString()}</p>
            </Card.Body>

        </Card>
    )
}

export default ArticleItem;