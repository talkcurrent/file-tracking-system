import React from 'react';
import UserCard from './UserCard';
import styled from 'styled-components';

const SearchResponse = (props) => {
    const { results, handleUserSelect } = props;
    return (
        <SearchResponseStyle>
            { results.length ?
                results.map((result, key) => {
                    return (
                        result.hasOwnProperty("username") ?
                            <React.Fragment key={ key }>
                                <div className="troll user-card"
                                    onClick={ e => handleUserSelect(result) }
                                    style={ { cursor: "pointer" } }
                                >
                                    <UserCard
                                        user={ result }
                                        bRadius={ "50%" }
                                        imgWidth={ "35px" }
                                        imgHeight={ "35px" }
                                        fontSize={ "small" }
                                    >
                                        <div className={ "card-user-details" }>
                                            <span>{ `@${result.username} ~ ` }</span>
                                            <span>{ `${result.city}, ${result.country}` }</span>
                                        </div>
                                    </UserCard>
                                </div>
                            </React.Fragment>
                            : ""
                    );
                })
                : result.hasOwnProperty("channel") ?
                    <React.Fragment key={ key }>

                    </React.Fragment>
                    : result.hasOwnProperty("club") ?
                        <React.Fragment key={ key }>

                        </React.Fragment>
                        : result.hasOwnProperty("store") ?
                            <React.Fragment key={ key }>

                            </React.Fragment>
                            : result.hasOwnProperty("services") ?
                                <React.Fragment key={ key }>

                                </React.Fragment>
                                : ""
            }
        </SearchResponseStyle>
    );
};

export default SearchResponse;
export const SearchResponseStyle = styled.div`
    display: grid;
    grid-gap: 0.5rem;
`;
