import React,{Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import {dashboardUrl} from '../config';

class Dashboard extends Component{
    constructor(props){
      super(props);
      this.state = {
        likesChartData:{},
        viewsChartData:{},
        retweetsChartData:{},
      }
    }
  
    static defaultProps = {
      displayTitle:true,
      displayLegend: true,
      legendPosition:'right',
      user:'John'
    }

    componentWillMount(){
        this.getChartData();
    }

    getChartData(){

        fetch(`${dashboardUrl}/dashboard/allTweets`,{
            headers: {
                'Accept': 'application/json,  text/plain, */*',
                'Content-Type': 'application/json'
              },
            credentials: 'include'
        })
        .then(res => res.json())
            .then(data => {               
                
                let likeIndexes = this.getLikesData(data);
                let likeLabels = []
                let likeData = []

                for (var i = 0; i < likeIndexes.length; i++) {
                    likeLabels.push(likeIndexes[i].index)
                    likeData.push(likeIndexes[i].likes)
                }

                let retweetIndexes = this.getRetweetsData(data);
                let retweetLabels = []
                let retweetData = []

                for (var i = 0; i < retweetIndexes.length; i++) {
                    retweetLabels.push(retweetIndexes[i].index)
                    retweetData.push(retweetIndexes[i].retweets)
                }

                let viewIndexes = this.getViewsData(data);
                let viewLabels = []
                let viewData = []

                for (var i = 0; i < viewIndexes.length; i++) {
                    viewLabels.push(viewIndexes[i].index)
                    viewData.push(viewIndexes[i].views)
                }

                let hourlyCounters = this.getHourlyData(data);
                let dailyCounters = this.getDailyData(data);
                let monthlyCounters = this.getMonthlyData(data);

                console.log(data);

                this.setState({
                    likesChartData:{
                        labels: likeLabels,
            datasets:[
              {
                  label:'Likes',
                data:likeData,
                backgroundColor:[
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(255, 159, 64, 0.6)',
                ]
              }
            ]
                    },
                    viewsChartData:{
                        labels: viewLabels,
            datasets:[
              {
                label:'Views',
                data:viewData,
                backgroundColor:[
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(255, 159, 64, 0.6)',
                ]
              }
            ]
                    },
                    retweetsChartData:{},
                    hourlyChartData:{
                        labels: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
            datasets:[
              {
                label:'Tweets',
                data:hourlyCounters,
                backgroundColor:[
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(255, 159, 64, 0.6)',
                ]
              }
            ]
                    },
                    dailyChartData:{
                        labels: ['Sat','Sun','Mon','Tues','Wed','Thurs','Fri'],
            datasets:[
              {
                label:'Tweets',
                data:dailyCounters,
                backgroundColor:[
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(255, 159, 64, 0.6)',
                ]
              }
            ]
                    },
                    monthlyChartData:{
                        labels: ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'],
            datasets:[
              {
                label:'Tweets',
                data:monthlyCounters,
                backgroundColor:[
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(255, 159, 64, 0.6)',
                ]
              }
            ]
                    }
                })
            })
            .catch(err => console.log(err));
      }

    getLikesData(tweets) {
        let popularTweets = [];
        for (var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].liked_by.length)
            popularTweets.push({
                index : i,
                likes: tweets[i].liked_by.length
            })
          }

        popularTweets.sort((a,b) => (b.likes - a.likes))

        console.log(popularTweets)

        return popularTweets.splice(0,10);
    }

    getRetweetsData(tweets) {
        let popularTweets = [];
        for (var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].retweeted_by.length)
            popularTweets.push({
                index : i,
                retweets: tweets[i].retweeted_by.length
            })
          }

        popularTweets.sort((a,b) => (b.retweets - a.retweets))

        console.log(popularTweets)

        return popularTweets.splice(0,10);
    }

    getViewsData(tweets) {
        let popularTweets = [];
        for (var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].bookmarked_by.length)
            popularTweets.push({
                index : i,
                views: tweets[i].bookmarked_by.length
            })
          }

        popularTweets.sort((a,b) => (b.views - a.views))

        console.log(popularTweets)

        return popularTweets.splice(0,10);
    }

    getHourlyData(tweets) {
        let hourlyTweets = new Array(24).fill(0);
        for (var i = 0; i < tweets.length; i++) {
            let time = tweets[i].created_date_time.split(" ")[1]
            let hour = time.split(":")[0]
            hourlyTweets[parseInt(hour, 10)] += 1
        }
        console.log(hourlyTweets)

        return hourlyTweets
    }

    getDailyData(tweets) {
        let dailyTweets = new Array(7).fill(0);
        for (var i = 0; i < tweets.length; i++) {
            let time = tweets[i].created_date_time.split(" ")[0]
            let day = time.split("/")[1]
            dailyTweets[(parseInt(day, 10))%7] += 1
        }
        console.log(dailyTweets)

        return dailyTweets
    }

    getMonthlyData(tweets) {
        let monthlyTweets = new Array(12).fill(0);
        for (var i = 0; i < tweets.length; i++) {
            let month = tweets[i].created_date_time.split("/")[0]
            monthlyTweets[((parseInt(month, 10)) - 1 ) % 12] += 1
        }
        console.log(monthlyTweets)

        return monthlyTweets
    }
  
    render(){
      return (
        <div className="chart">

        {/* Likes Bar Graph */}
          <Bar
            data={this.state.likesChartData}
            options={{
              title:{
                display:this.props.displayTitle,
                text:'10 Most liked tweets ',
                fontSize:25
              },
              legend:{
                display:this.props.displayLegend,
                position:this.props.legendPosition
              }
            }}
          />

          {/* Views Bar Graph */}
          <Bar
            data={this.state.viewsChartData}
            options={{
              title:{
                display:this.props.displayTitle,
                text:'10 Most viewed tweets ',
                fontSize:25
              },
              legend:{
                display:this.props.displayLegend,
                position:this.props.legendPosition
              }
            }}
          />

          {/* Retweets Bar Graph */}
          <Bar
            data={this.state.retweetsChartData}
            options={{
              title:{
                display:this.props.displayTitle,
                text:'10 Most retweeted tweets ',
                fontSize:25
              },
              legend:{
                display:this.props.displayLegend,
                position:this.props.legendPosition
              }
            }}
          />

          {/* Hourly Line Graph */}
          <Line
            data={this.state.hourlyChartData}
            options={{
              title:{
                display:this.props.displayTitle,
                text:'Tweets per Hour',
                fontSize:25
              },
              legend:{
                display:this.props.displayLegend,
                position:this.props.legendPosition
              }
            }}
          />

          {/* Daily Line Graph */}
          <Line
            data={this.state.dailyChartData}
            options={{
              title:{
                display:this.props.displayTitle,
                text:'Tweets per Day of the Week',
                fontSize:25
              },
              legend:{
                display:this.props.displayLegend,
                position:this.props.legendPosition
              }
            }}
          />

          {/* Monthly Line Graph */}
          <Line
            data={this.state.monthlyChartData}
            options={{
              title:{
                display:this.props.displayTitle,
                text:'Tweets per Month',
                fontSize:25
              },
              legend:{
                display:this.props.displayLegend,
                position:this.props.legendPosition
              }
            }}
          />
  
          {/* <Pie
            data={this.state.chartData}
            options={{
              title:{
                display:this.props.displayTitle,
                text:'Largest Cities In '+this.props.location,
                fontSize:25
              },
              legend:{
                display:this.props.displayLegend,
                position:this.props.legendPosition
              }
            }}
          /> */}
        </div>
      )
    }
  }
  
  export default Dashboard;