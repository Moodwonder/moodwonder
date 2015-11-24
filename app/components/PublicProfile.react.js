import React from 'react';
import ParticipationGraph from 'components/ParticipationGraph.react';
import SurveyParticipationActions from 'actions/SurveyParticipationActions';
import SurveyParticipationStore from 'stores/SurveyParticipationStore';
import SurveyParticipation from 'utils/SurveyParticipation';



export default class PublicProfile extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          mySurvey: []
      };
  }

  componentDidMount() {
      SurveyParticipationActions.getMySurveyParticipation();
      SurveyParticipationStore.listen(this._onChange);
  }

  componentWillUnmount() {
      SurveyParticipationStore.unlisten(this._onChange);
  }

  _onChange = () => {
      this.setState({
          mySurvey: SurveyParticipationStore.getState().mySurvey
      });
  }



  render() {

      let mySurvey = this.state.mySurvey;
      let sPercentage = SurveyParticipation.surveyPercentage(mySurvey);

      let content;
      if (!isNaN(sPercentage)) {
          content = (<ParticipationGraph percentage={sPercentage} />);
      }

      return (
            <div className="ui segment brdr-none padding-none width-rating  ">
                <div className="clear"></div>
                <div className="ui two column stackable grid container ">
                    <div className="column">
                        <h4 className="ui header ryt com">Public Profile View</h4>
                    </div>
                    <div className="column"></div>
                    {content}
                </div>
            </div>
      );
  }
}

