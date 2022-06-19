import React from "react";
var createReactClass = require("create-react-class");
import "./dialer.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import CallIcon from "@mui/icons-material/Call";
import InsufficientBalanceLiveCall from "../../../Pages/InsufficientBalanceLiveCall/InsufficientBalanceLiveCall";
import PhoneNotAvailableLiveCall from "../../../Pages/PhoneNotAvailableLiveCall/PhoneNotAvailableLiveCall";

var NumberInputText = createReactClass({
  render: function () {
    return (
      <>
        <div>
          <h4
            style={{
              fontWeight: "bold",
              marginLeft: "1.5rem",
              marginBottom: "1.5rem",
            }}
          >
            Make Live Call
          </h4>
        </div>
        <div className="input-group input-group-sm">
          <input
            type="tel"
            className="form-control"
            placeholder="Recipient Phone Number"
            value={this.props.currentNumber}
            onChange={this.props.handleOnChange}
            style={{ marginBottom: "0.5rem" }}
          />
        </div>
      </>
    );
  },
});

var CountrySelectBox = createReactClass({
  render: function () {
    var self = this;

    var CountryOptions = self.props.countries.map(function (country) {
      var flagClass = "flag flag-" + country.code;

      return (
        <li>
          <a href="#" onClick={() => self.props.handleOnChange(country.cc)}>
            <div className={flagClass}></div>
            <span>
              {" "}
              {country.name} (+{country.cc})
            </span>
          </a>
        </li>
      );
    });

    return (
      <div className="input-group-btn">
        <button
          type="button"
          className="btn btn-default dropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          +<span className="country-code">{self.props.countryCode}</span>
          <i className="fa fa-caret-down"></i>
        </button>
        <ul className="dropdown-menu">{CountryOptions}</ul>
      </div>
    );
  },
});

var LogBox = createReactClass({
  render: function () {
    return (
      <div>
        <div className="log">{this.props.text}</div>
        <p className="dialer-text">{this.props.smallText}</p>
      </div>
    );
  },
});

var CallButton = createReactClass({
  render: function () {
    return (
      <div>
        <button
          style={{ paddingRight: "2.4rem", borderRadius: "80%" }}
          className={
            "btn btn-circle btn-success " +
            (this.props.onPhone ? "btn-danger" : "btn-success")
          }
          onClick={this.props.handleOnClick}
          disabled={this.props.disabled}
        >
          <i
            className={
              "fa fa-fw fa-phone " +
              (this.props.onPhone ? "fa-close" : "fa-phone")
            }
          ></i>
          {/* Dial */}
          <CallIcon />
        </button>
      </div>
    );
  },
});

var MuteButton = createReactClass({
  render: function () {
    return (
      <div>
        <button
          className="btn btn-circle btn-default"
          onClick={this.props.handleOnClick}
        >
          <i
            className={
              "fa fa-fw fa-microphone " +
              (this.props.muted ? "fa-microphone-slash" : "fa-microphone")
            }
          ></i>
        </button>
      </div>
    );
  },
});

var DTMFTone = createReactClass({
  // Handle numeric buttons
  sendDigit(digit) {
    Twilio.Device.activeConnection().sendDigits(digit);
  },

  render: function () {
    return (
      <div>
        <div className="keys">
          <div className="key-row">
            <button
              className="btn btn-circle btn-default"
              onClick={() => this.sendDigit("1")}
            >
              1
            </button>
            <button
              className="btn btn-circle btn-default"
              onClick={() => this.sendDigit("2")}
            >
              2<span>A B C</span>
            </button>
            <button
              className="btn btn-circle btn-default"
              onClick={() => this.sendDigit("3")}
            >
              3<span>D E F</span>
            </button>
          </div>
          <div className="key-row">
            <button
              className="btn btn-circle btn-default"
              onClick={() => this.sendDigit("4")}
            >
              4<span>G H I</span>
            </button>
            <button
              className="btn btn-circle btn-default"
              onClick={() => this.sendDigit("5")}
            >
              5<span>J K L</span>
            </button>
            <button
              className="btn btn-circle btn-default"
              onClick={() => this.sendDigit("6")}
            >
              6<span>M N O</span>
            </button>
          </div>
          <div className="key-row">
            <button
              className="btn btn-circle btn-default"
              onClick={() => this.sendDigit("7")}
            >
              7<span>P Q R S</span>
            </button>
            <button
              className="btn btn-circle btn-default"
              onClick={() => this.sendDigit("8")}
            >
              8<span>T U V</span>
            </button>
            <button
              className="btn btn-circle btn-default"
              onClick={() => this.sendDigit("9")}
            >
              9<span>W X Y Z</span>
            </button>
          </div>
          <div className="key-row">
            <button
              className="btn btn-circle btn-default"
              onClick={() => this.sendDigit("*")}
            >
              *
            </button>
            <button
              className="btn btn-circle btn-default"
              onClick={() => this.sendDigit("0")}
            >
              0
            </button>
            <button
              className="btn btn-circle btn-default"
              onClick={() => this.sendDigit("#")}
            >
              #
            </button>
          </div>
        </div>
      </div>
    );
  },
});

const isBalance = localStorage.getItem("balance");
const isPhone = localStorage.getItem("phone");

var DialerApp = createReactClass({
  getInitialState() {
    return {
      muted: false,
      log: "Ready...",
      onPhone: false,
      countryCode: "1",
      currentNumber: "",
      isValidNumber: false,
      // countries: [
      //   { name: "United States", cc: "1", code: "us" },
      //   { name: "Great Britain", cc: "44", code: "gb" },
      //   { name: "Colombia", cc: "57", code: "co" },
      //   { name: "Ecuador", cc: "593", code: "ec" },
      //   { name: "Estonia", cc: "372", code: "ee" },
      //   { name: "Germany", cc: "49", code: "de" },
      //   { name: "Hong Kong", cc: "852", code: "hk" },
      //   { name: "Ireland", cc: "353", code: "ie" },
      //   { name: "Singapore", cc: "65", code: "sg" },
      //   { name: "Spain", cc: "34", code: "es" },
      //   { name: "Brazil", cc: "55", code: "br" },
      //   { name: "Pakistan", cc: "92", code: "pk" },
      // ],
    };
  },

  // Initialize after component creation
  componentDidMount() {
    var self = this;
    //  Fetch Twilio capability token from our Node.js server
    $.getJSON("http://localhost:4000/token")
      .done(function (data) {
        Twilio.Device.setup(data.token);
      })
      .fail(function (err) {
        console.log(err);
        self.setState({ log: "Could not fetch token, see console.log" });
      });
    // Configure event handlers for Twilio Device
    Twilio.Device.disconnect(function () {
      self.setState({
        onPhone: false,
        log: "Call ended.",
      });
    });
    Twilio.Device.ready(function () {
      self.log = "Connected";
    });
  },

  // Handle country code selection
  handleChangeCountryCode(countryCode) {
    this.setState({ countryCode: countryCode });
  },

  // Handle number input
  handleChangeNumber(e) {
    this.setState({
      currentNumber: e.target.value,
      isValidNumber: /^([0-9,+]|#|\*)+$/.test(
        e.target.value.replace(/[-()\s]/g, "")
      ),
    });
  },

  // Handle muting
  handleToggleMute() {
    var muted = !this.state.muted;

    this.setState({ muted: muted });
    Twilio.Device.activeConnection().mute(muted);
  },

  // Make an outbound call with the current number,
  // or hang up the current call
  handleToggleCall() {
    if (!this.state.onPhone) {
      this.setState({
        muted: false,
        onPhone: true,
      });
      // make outbound call with current number
      var n =
        "+" +
        this.state.countryCode +
        this.state.currentNumber.replace(/\D/g, "");
      Twilio.Device.connect({ number: n });
      this.setState({ log: "Calling " + n });
    } else {
      // hang up call in progress
      Twilio.Device.disconnectAll();
    }
  },

  render: function () {
    var self = this;

    return (
      // isBalance
      <>
        {isBalance <= 0 ? (
          <InsufficientBalanceLiveCall />
        ) : !isPhone ? (
          <PhoneNotAvailableLiveCall />
        ) : (
          <div id="dialer">
            <div id="dial-form" className="input-group input-group-sm">
              {/* <CountrySelectBox
            countries={this.state.countries}
            countryCode={this.state.countryCode}
            handleOnChange={this.handleChangeCountryCode}
          /> */}

              <NumberInputText
                currentNumber={this.state.currentNumber}
                handleOnChange={this.handleChangeNumber}
              />
            </div>

            <div className="controls">
              <CallButton
                handleOnClick={this.handleToggleCall}
                disabled={!this.state.isValidNumber}
                onPhone={this.state.onPhone}
              />

              {this.state.onPhone ? (
                <MuteButton
                  handleOnClick={this.handleToggleMute}
                  muted={this.state.muted}
                />
              ) : null}
            </div>

            {this.state.onPhone ? <DTMFTone /> : null}

            <LogBox text={this.state.log} />
          </div>
        )}
      </>
    );
  },
});

export default DialerApp;

// export default ReactDOM.render(<DialerApp />, document.getElementById("root"));
