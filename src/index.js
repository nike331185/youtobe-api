import _ from 'lodash'
import React  ,{Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY='AIzaSyCc_L3wpfBey215PFmpkvueN-PZTi2WaEU';


class App extends Component{
	constructor(props){  //state是一個object，在裡面設定date變數並把目前時間指定給state。在ES6 class寫法中，要在constructor設定state初始值，直接指定object給state。
		super(props);     //父元件傳props給子元件，子元件可以依據props設定state或是自己定義state，但state只有component自己使用，不會往上傳，所以在React裡只有單向資料流，就像waterfall一樣，永遠是"top-down"。
		this.state={      //state 初始化
			videos:[],
			selectedVideo:null
		};
		this.videoSearch('surfboards')
	}
	videoSearch(term){
		YTSearch({key:API_KEY,term:term}, (videos) => {
			this.setState({    //setState 改值
				videos: videos,
				selectedVideo:videos[0]
			});
		});
	}

  render() {
		const videoSearch = _.debounce((term)=>{this.videoSearch(term)},300);

		return(
			<div>
				<SearchBar onSearchTermChange={videoSearch}/>
				<VideoDetail video={this.state.selectedVideo } />
				<VideoList
				 onVideoSelect={selectedVideo => this.setState({selectedVideo})}
				 videos={this.state.videos} />
			</div>
		);
  }
}

ReactDOM.render(<App />,document.querySelector('.container'));
