import React from 'react';

class Form extends React.Component {

  constructor() {
    super();

    this.state = {
      fields: {
        title: '',
        body: '',
        tags: '',
      },
      errors: {}
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()

    if (this.validateForm()) {
      let fields = {};
      fields["title"] = '';
      fields["body"] = '';
      fields["tags"] = '';

      const id = new Date().getTime() 
      const newArticle = {
        id: id,
        title: this.state.fields.title,
        body: this.state.fields.body,
        tags: this.state.fields.tags.map(item => item.trim())
      }

      const currentArticles = JSON.parse(localStorage.getItem('articles'));
      currentArticles.push(newArticle)
      localStorage.setItem('articles', JSON.stringify(currentArticles))
      
      this.setState({fields:fields});
      return this.props.addArticle(newArticle)
    }
  }

  handleChange = (e) => {
    let fields = this.state.fields;
    if(e.target.name === 'tags') {
      fields[e.target.name] = e.target.value.split(',');
    }
    else {
      fields[e.target.name] = e.target.value;
    }

    this.handleValidate(e)
    this.setState({fields});
  }

  handleValidate = (e) => {
    const error = this.state.errors;
    if (e.target.value) error[e.target.name] = '';
    if (e.target.value.indexOf(' ') >= 0) error[e.target.name] = ''

    this.setState({
      errors: error
    });
  }

  validateForm = () => {

    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields['title'] || fields['title'].indexOf(' ') >= 0) {
      formIsValid = false;
      errors['title'] = '* Напиши заголовок.';
    }

    if (!fields['body']) {
      formIsValid = false;
      errors['body'] = '* Добавить текста.';
    }

    if (!fields['tags']) {
      formIsValid = false;
      errors['tags'] = '* И немного тэгов через зарятую.';
    }

    this.setState({
      errors: errors
    });
    return formIsValid;
  }

  errorClass = (error) => {
    return error ? 'has-error' : ''
  }
  
  render() {
    const titleError = this.state.errors.title
    const bodyError = this.state.errors.body
    const tagsError = this.state.errors.tags

    return (
      <form id="post-add" className="col-lg-4" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input 
            type="text" 
            name="title" 
            className={`form-control ${this.errorClass(this.state.errors.title)}`} 
            placeholder="заголовок"
            onChange={this.handleChange}
            value={this.state.fields.title}
          />
          {titleError && <div className="errorMsg">{titleError}</div>}
        </div>
        <div className="form-group">
          <input
            type="text"
            name="body"
            className={`form-control ${this.errorClass(this.state.errors.body)}`} 
            placeholder="запись"
            onChange={this.handleChange}
            value={this.state.fields.body}
          />
          {bodyError && <div className="errorMsg">{bodyError}</div>}
        </div>
        <div className="form-group">
          <input 
            type="text" 
            name="tags" 
            className={`form-control ${this.errorClass(this.state.errors.tags)}`} 
            placeholder="тег, еще тег" 
            onChange={this.handleChange}
            value={this.state.fields.tags}
          />
          {tagsError && <div className="errorMsg">{tagsError}</div>}
          </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    )
  }
}

export default Form