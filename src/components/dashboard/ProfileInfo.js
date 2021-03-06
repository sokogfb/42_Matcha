import React from 'react';
import TimeAgo from 'react-timeago';
import { formatter, imgPath } from 'helpers';

export class ProfileInfo extends React.Component {

    genderValue(value) {
        var optionsGender = ['Man', 'Woman'];
        return optionsGender[value];
    }
    orientationValue(value) {
        var optionsGender = ['Women and Men', 'Men', 'Woman'];
        return optionsGender[value];
    }

    tagsDisplay(tags) {
        let div = [];
        for (var i = 0; i < tags.length; i++) {
            div.push(
                <div key={i} className="tags">
                    #{tags[i]}
                </div>
            )
        }
        return div;
    }

    imagesDisplay(images) {
        let div = [];
        for (var i = 0; i < images.length; i++) {
            div.push(
                <div key={i} className="picture">
                    <img src={imgPath(images[i].path)} alt="profile_img" />
                </div>
            )
        }
        return div;
    }

    getUserLocation(userData) {
        if (userData.city_user && userData.country_user) {
            return `${userData.city_user}, ${userData.country_user}`;
        } else if (userData.city_ip && userData.country_ip) {
            return `${userData.city_ip}, ${userData.country_ip}`;
        } else {
            return "Unknown";
        }
    }

    getProperTitle() {
        const { userData, user } = this.props
        let isUser;
        let titles;
        user === userData[0].username ? isUser = true : isUser = false

        if (isUser)
            titles = ["What are you looking for ?", "Your interests"]
        else {
            if (userData[0].gender === 0)
                titles = ["What is he looking for ?", "His interests", "He liked your profile", "It's a match !"]
            else
                titles = ["What is she looking for ?", "Her interests", "she liked your profile", "It's a match !"]
        }
        return titles

    }

    render() {
        const { userData, handleClick, user } = this.props;
        const titles = this.getProperTitle();
        let isUser;
        user === userData[0].username ? isUser = true : isUser = false

        return (
            <div className="edit-profile grid-area">
                {isUser &&
                    <div className="header">
                        <h1>Edit your profile
                        <i className="fas fa-pen" onClick={handleClick}></i>
                        </h1>
                    </div>
                }
                <div className="profile-picture">
                    <img src={imgPath(userData[0].profile_img)} alt="profile_img" />
                    {!isUser &&
                        <div className="profile-picture-div">
                            <h5 className={userData[0].online === 1 ? 'online' : ''}>{userData[0].online === 1 ? 'Online' : <TimeAgo date={parseInt(userData[0].connexion, 10)} formatter={formatter} />}</h5>
                            <div className="profile-actions">
                                <i className="fas fa-ban" onClick={this.props.handleBlock} id={userData[0].username}></i>
                                <i className="fas fa-flag" onClick={this.props.handleReport}  id={userData[0].username}></i>
                            </div>
                        </div>
                    }

                </div>
                <h1>{userData[0].first_name}&nbsp;{userData[0].last_name}
                    {!isUser && <div onClick={this.props.handleClick} className={userData[0].mymatch > 1 ? "button liked" :"button"} id={userData[0].username}><i id={userData[0].username} className="fas fa-heart"></i></div>}
                </h1>
                {!isUser &&
                <div className="profile-interaction">
                    <h1 className="profile-score">{userData[0].total}</h1>
                    { userData[0].match > 1  &&
                        <h1 className={ userData[0].match === 2 ? "profile-score like" : "profile-score match" }>{titles[userData[0].match]}</h1>
                    }
                </div>
                }
                <div className="edit-infos">
                    <h3>Personal information</h3>
                    <div className="profile-data">
                        <div className="data-details">
                            <h5>Age</h5>
                            <h4>{userData[0].age}</h4>
                        </div>
                        <div className="data-details">
                            <h5>Location</h5>
                            <h4>{this.getUserLocation(userData[0])}</h4>
                        </div>
                        <div className="data-details">
                            <h5>Gender</h5>
                            <h4>{this.genderValue(userData[0].gender)}</h4>
                        </div>
                    </div>
                </div>
                <div className="edit-interest">
                    <h3>{titles[0]}</h3>
                    <p className="p-small">{this.orientationValue(userData[0].orientation)}</p>
                </div>
                <div className="edit-interest">
                    <h3>Bio</h3>
                    <p>{userData[0].bio}</p>
                </div>
                <div className="edit-interest" >
                    <h3>{titles[1]}</h3>
                    <div className="display-tags">
                        {this.tagsDisplay(userData[1])}
                    </div>
                </div>
                <div className="edit-picture">
                    {this.imagesDisplay(userData[2])}
                </div>
            </div>
        )
    }
}