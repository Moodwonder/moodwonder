import alt from 'altInstance';
import AdminWebAPIUtils from 'utils/CommonAdminWebAPIUtils';

/**
 * PlacesActions
 */
class PlacesActions {

  // add new places
  addPlaces (data) {
      this.dispatch();
      AdminWebAPIUtils.addPlaces(data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.addplaces(response);
                this.actions.getPlaces(data);
            }
        }, () => {
        });
  }

  addplaces (response) {
      this.dispatch(response);
  }

  // add new continent
  getPlaces (data) {
      this.dispatch();
      AdminWebAPIUtils.getPlaces(data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.getplaces(response);
               // this.actions.getcontinents();
            }
        }, () => {
        });
  }

  getplaces (response) {
      this.dispatch(response);
  }

  // update places
  updatePlaces (data,_id) {
      this.dispatch();
      AdminWebAPIUtils.updatePlaces(data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.updateplaces(response);

                // only using `placeType` param
                if(data.placeType === 'country' || data.placeType === 'state' || data.placeType === 'city'){
                    data._id = _id;
                    this.actions.getPlaces(data);
                }else{
                    this.actions.getPlaces(data);
                }
            }
        }, () => {
        });
  }

  updateplaces (response) {
      this.dispatch(response);
  }

  // delete Places
  deletePlaces (data,_id) {
      this.dispatch();
      AdminWebAPIUtils.deletePlaces(data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.deleteplaces(response);
                if(data.placeType === 'country' || data.placeType === 'state' || data.placeType === 'city'){
                    data._id = _id;
                    this.actions.getPlaces(data);
                }else{
                    this.actions.getPlaces(data);
                }
            }
        }, () => {
        });
  }

  deleteplaces (response) {
      this.dispatch(response);
  }

}

export default alt.createActions(PlacesActions);
