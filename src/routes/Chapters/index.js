import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './index.less';

import Rnage from '../../components/InputRange';

class Chapters extends Component {
  constructor(porps) {
    super(porps);
    this.back = () => {
      this.props.history.goBack();
    };
    this.goToChapter = (nextChapter) => {
      this.props.dispatch({
        type: 'reader/goToChapter',
        payload: { nextChapter },
      });
      this.props.history.goBack();
    };
    // 滑动顶部进度条
    this.skip = () => {
      setTimeout(() => {
        document.getElementById(this.range.value).scrollIntoView(false);
      /*
          scrollIntoView()可以在所有的HTML元素上调用，通过滚动浏览器窗口或某个容器元素，
      调用元素就可以出现在视窗中。如果给该方法传入true作为参数，或者不传入任何参数，那么
      窗口滚动之后会让调动元素顶部和视窗顶部尽可能齐平。如果传入false作为参数，调用元素
      会尽可能全部出现在视口中（可能的话，调用元素的底部会与视口的顶部齐平。）不过顶部
      不一定齐平。
          支持该方法的浏览器有 IE、Firefox、Safari和Opera。
      */
      }, 100);
    };
  }
  componentDidMount() {
    const { chapters, currentChapter } = this.props;
    const chapterLen = chapters.length;
    let id = currentChapter + 7;
    id = id >= chapterLen ? chapterLen - 1 : id;
    setTimeout(() => {
      try {
        document.getElementById(`${id || 0}`).scrollIntoView(false);
      } catch (error) {
        console.log(error);
      }
    }, 100);
  }
  render() {
    const { chapters, currentChapter } = this.props;
    return (<div>
      <div className={styles.top}>
        <Rnage
          option={{
            max: chapters.length,
            min: 0,
            step: 1,
            onChange: this.skip,
            defaultValue: currentChapter,
            ref: (c) => { this.range = c; },
          }}
        />
        <a onClick={this.back}>取消</a>
      </div>

      <ul className={styles.list}>
        {chapters.map((i, index) => (<li
          key={i.link}
          id={index}
        >
          <a
            style={index === currentChapter ? { color: 'red' } : {}}
            onClick={this.goToChapter.bind(this, index)}
          >
            {index === currentChapter && '当前: ' }
            {i.title}
          </a>
        </li>))
      }
      </ul>
    </div>);
  }
}

function mapStateToProps(state) {
  const { chapters, currentChapter } = state.reader;
  return {
    chapters,
    currentChapter,
  };
}

export default connect(mapStateToProps)(Chapters);
