import React, { useState, useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { Route } from "react-router";
import s from "./MetaData.module.css";
import {getMetaDataThunkCreator, setActiveEl} from '../../redux/metadata-reducer'
import SparklineContainer from "../Sparkline/Crypto_Sparkline";

const MetaDataPage = (props) => {
  //debugger;
  const [data, setData] = useState(null)
  const [showMore, setShowMore] = useState(false);
  // props.getMetaDataThunkCreator(props.currentCoinId)

  useEffect(() => {
    props.getMetaDataThunkCreator(props.currentCoinId)
  }, [props.currentCoinId])


  const showContent = () => {
    setShowMore(!showMore);
    console.log(showMore);
  };
  return (
    <div className={s.dataPage}>
      {props.isLoading ? (
        <Spinner animation="border" />
      ) : (
        <div>
          <Container>
            <div className={s.section}>
              <h1>About {props.info[0].name}</h1>
              <p className={showMore ? s.showMore : s.description}>
                {props.info.length !== 0 ? props.info[0].description : null}
              </p>
              <button onClick={showContent}>
                {showMore ? "Show less" : "Show more"}
              </button>
            </div>
            <div className={s.section}>
              <div>
                <ul className={s.descriptionLinks}>
                  <li>
                    <h5>Currency name </h5>
                    <p>{props.info[0].name}</p>
                  </li>
                  <li>
                    <h5>Web site</h5>
                    <p>
                      <a href={props.info[0].website_url}>
                        {props.info[0].website_url}
                      </a>
                    </p>
                  </li>
                  <li>
                    <h5>Block Explorer</h5>
                    <p>
                      <a href={props.info[0].block_explorer_url}>
                        {props.info[0].block_explorer_url}
                      </a>
                    </p>
                  </li>
                  <li>
                    <h5>Original symbol</h5>
                    <p>{props.info[0].original_symbol}</p>
                  </li>
                  <li>
                    <h5>Reddit</h5>
                    <p>
                      <a href={props.info[0].reddit_url}>
                        {props.info[0].reddit_url}
                      </a>
                    </p>
                  </li>
                  <li>
                    <h5>Whitepaper</h5>
                    <p>
                      <a href={props.info[0].whitepaper_url}>
                        {props.info[0].whitepaper_url}
                      </a>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            {props.isSpaklineLoaded ? 
            (
              <Spinner animation="border" />
            ) : (
            <div className={s.section}>
              <SparklineContainer activeEl={props.activeEl} setActiveEl={props.setActiveEl} />
            </div>
            )
            }
            
          </Container>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    info: state.metaDataPage.info,
    isLoading: state.metaDataPage.isLoading,
    currentCoinId: state.metaDataPage.currentCoinId,
    activeEl: state.metaDataPage.activeEl,
    isSpaklineLoaded: state.metaDataPage.isSpaklineLoaded
  };
};

const MetaDataPageContainer = connect(mapStateToProps, {getMetaDataThunkCreator, setActiveEl})(MetaDataPage);

export default MetaDataPageContainer;
