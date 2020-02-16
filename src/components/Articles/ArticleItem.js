import React from "react";

class ArticleItem extends React.Component {

  render() {
    const { title, body, tags, id } = this.props.data
    return (
      <article>
        <header>
            <h3>{title}</h3>
        </header>
        <section>
            <p>{body}</p>
        </section>
        <footer>
            <div className="tags">
              {tags.map(tag => {
                return <button className="btn btn-xs btn-default mx-1 my-1" key={tag}>{tag}</button>
              })}
            </div>
        </footer>
        <div className="controls">
            <button className="btn btn-danger btn-mini" onClick={() => this.props.remove(id)}>удалить</button>
        </div>
      </article>
    )
  }
}

export default ArticleItem;