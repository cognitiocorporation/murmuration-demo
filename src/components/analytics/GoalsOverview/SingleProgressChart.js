import React from "react";
import PropTypes from "prop-types";
import { ListGroupItem, Col } from "shards-react";

import Chart from "../../../utils/chart";

class SingleProgressChart extends React.Component {
    constructor(props) {
      super(props);
  
      this.canvasRef = React.createRef();
    }

    componentDidMount() {
        new Chart(this.canvasRef.current, {
          type: "doughnut",
          data: this.props.idea.data,
          options: {
            legend: false,
            responsive: false,
            cutoutPercentage: 70,
            animation: false,
            tooltips: false
          }
        });
      }

    render() {
        const { idea } = this.props;
        return (
            <div>
                <div className="go-stats__chart d-flex justify-content-center">
                    <h6 className="go-stats__label justify-content-start">{idea.data.conversionRate}</h6>
                    <canvas
                        ref={this.canvasRef}
                        style={{ width: "50px", height: "50px" }}
                        className="my-auto"
                    />
                </div>
            </div>
            );
        }
}

SingleProgressChart.propTypes = {
    /**
     * The goal object.
     */
    idea: PropTypes.object
  };
  
  export default SingleProgressChart;
  