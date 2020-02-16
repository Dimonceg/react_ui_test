import React from "react";

function ArticleItem(props) {
  const { title, body, tags, id } = props.data

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
          <button className="btn btn-danger btn-mini" onClick={() => props.remove(id)}>удалить</button>
      </div>
    </article>
  )
}

export default ArticleItem;