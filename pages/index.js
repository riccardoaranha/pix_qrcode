import Head from 'next/head';
import Header from '../components/Header';
import Static from '../components/Static';
/*
https://colorlib.com/wp/template/colorlib-contact-form/
https://codepen.io/colorlib/pen/KVoZyv
https://coolors.co/939597-f5df4d-fb3640-861657-434a42
*/
const Home = () => {
	return (

<div id="page-home">
	<div className="content">
		<Header / >
		<Static/>
	</div>
	<style tsx>{`
@import url(https://fonts.googleapis.com/css?family=Roboto:400,300,600,400italic);
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-font-smoothing: antialiased;
  -o-font-smoothing: antialiased;
  font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

body {
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  font-weight: 100;
  font-size: 12px;
  line-height: 30px;
  color: #939597;
  background: #F5DF4D;
}

.container {
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  position: relative;
}

.form-qrcode input[type="text"],
.form-qrcode input[type="email"],
.form-qrcode input[type="tel"],
.form-qrcode input[type="url"],
.form-qrcode select,
.form-qrcode textarea,
.form-qrcode button[type="submit"] {
  font: 400 12px/16px "Roboto", Helvetica, Arial, sans-serif;
}

.form-qrcode {
  background\: #939597;
  color: #F5DF4D;
  padding: 25px;
  margin: 150px 0;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}

.form-qrcode h2 {
  display: block;
  font-size: 30px;
  font-weight: 300;
  margin-bottom: 10px;
  text-align: center;
}

.form-qrcode h3 {
  margin: 5px 0 15px;
  display: block;
  font-size: 13px;
  font-weight: 400;
}

fieldset {
  border: medium none !important;
  margin: 0 0 10px;
  min-width: 100%;
  padding: 0;
  width: 100%;
}

.form-qrcode input,
.form-qrcode select,
.form-qrcode textarea {
  width: 100%;
  border: 1px solid #F5DF4D;
  background: #FFF;
  margin: 0 0 5px;
  padding: 10px;
}

.form-qrcode input:hover,
.form-qrcode selece:hover,
.form-qrcode textarea:hover {
  -webkit-transition: border-color 0.3s ease-in-out;
  -moz-transition: border-color 0.3s ease-in-out;
  transition: border-color 0.3s ease-in-out;
  border: 1px solid #aaa;
}

.form-qrcode textarea {
  height: 100px;
  max-width: 100%;
  resize: none;
}

.form-qrcode button[type="submit"] {
  cursor: pointer;
  width: 100%;
  border: none;
  background: #FB3640;
  color: #FFF;
  margin: 0 0 5px;
  padding: 10px;
  font-size: 15px;
}

.form-qrcode button[type="submit"]:hover {
  background: #861657;
  -webkit-transition: background 0.3s ease-in-out;
  -moz-transition: background 0.3s ease-in-out;
  transition: background-color 0.3s ease-in-out;
}

.form-qrcode button[type="submit"]:active {
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);
}

.copyright {
  text-align: center;
}

.form-qrcode input:focus,
.form-qrcode textarea:focus {
  outline: 0;
  border: 1px solid #aaa;
}

::-webkit-input-placeholder {
  color: #888;
}

:-moz-placeholder {
  color: #888;
}

::-moz-placeholder {
  color: #888;
}

:-ms-input-placeholder {
  color: #888;
}
	`}</style>
</div>

	);
}

export default Home;
