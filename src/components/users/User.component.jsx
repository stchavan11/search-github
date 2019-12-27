import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Repos from '../repos/Repos.component'
import ReposItem from '../repos/ReposItem.component';

class User extends Component {
    componentDidMount() {
        this.props.getUser(this.props.match.params.login);
        this.props.getUserRepos(this.props.match.params.login);

    }
    render() {
        const {
            name, company,
            avatar_url, location, bio, blog, login, html_url,
            followers, following, public_repos, public_gists, hireable
        } = this.props.user;

        const { loading, repos } = this.props;
        return (
            <Fragment>
                <Link to='/' className='btn btn-light'>
                    Back to
                </Link>
                {/* Hireable: {''}
                {hireable ? (<i className="fas fa-check text-success" />) :
                    (<i className="fas fa-times-circle text-danger" />)} */}
                <div className="card grid-2">
                    <div className="all-center">
                        <img src={avatar_url} alt="" className="round-img" style={{ width: '150px' }}
                        />
                        <h1>{name}</h1>
                        <p>Location: {location}</p>
                    </div>
                    <div>
                        {bio && <Fragment>
                            <h3>BIO</h3>
                            <p>
                                {bio}
                            </p>
                        </Fragment>}
                        <a href={html_url} className="btn btn-success my-1">Visit Github Profile</a>
                        <ul>
                            <li>
                                {login && <Fragment> <strong>
                                    Username:
                                    </strong> {login}
                                </Fragment>}
                            </li>
                            <li>
                                {company && <Fragment> <strong>
                                    Company:
                                    </strong> {company}
                                </Fragment>}
                            </li>
                            <li>
                                {blog && <Fragment> <strong>
                                    Website:
                                    </strong> {blog}
                                </Fragment>}
                            </li>

                        </ul>
                    </div>
                </div>
                <div className="card text-center">
                    <div className="badge badge-primary">Followers: {followers}</div>
                    <div className="badge badge-light">Following: {following}</div>
                    <div className="badge badge-primary">Public Repos: {public_repos}</div>
                    <div className="badge badge-light">Public Gists: {public_gists}</div>
                </div>
                <Repos repos={repos} />
            </Fragment>
        )
    }
}

export default User 
