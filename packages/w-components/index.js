import DOM from "./util/DOM.js";
import Theme from "./util/Theme.js";

import AlertDialog from "./components/dialog/AlertDialog.js";
import Button from "./components/button/Button.js";
import Calendar from "./components/Calendar.js";
import Camera from "./components/Camera.js";
import Card from "./components/layout/Card.js";
import CheckBox from "./components/form/checkable/Checkbox.js";
import Code from "./components/Code.js";
import ConfirmDialog from "./components/dialog/ConfirmDialog.js";
import Dialog from "./components/dialog/Dialog.js";
import DisplayHeading from "./components/DisplayHeading.js";
import Form from "./components/form/Form.js"; 
import Grid from "./components/layout/Grid.js";
import Heading from "./components/Heading.js";
import Hero from "./components/layout/Hero.js";
import Icon from "./components/Icon.js";
import IconButton from "./components/button/IconButton.js";
import List from "./components/List.js";
import ListItem from "./components/ListItem.js";
import Nav from './components/layout/nav/Nav.js';
import NavPart from './components/layout/nav/NavPart.js';
import Option from "./components/form/Option.js";
import Quote from "./components/Quote.js";
import Radio from "./components/form/checkable/Radio.js";
import Section from "./components/layout/Section.js";
import Select from "./components/form/Select.js";
import SPALink from "./components/spa/SPALink.js";
import SPAPage from "./components/spa/SPAPage.js";
import SideMenu from "./components/layout/menu/SideMenu.js";
import SideMenuContent from "./components/layout/menu/SideMenuContent.js";
import SideMenuLayout from "./components/layout/menu/SideMenuLayout.js";
import TextInput from "./components/form/TextInput.js";
import TextArea from "./components/form/TextArea.js";
import TypeWriter from "./components/TypeWriter.js";

const defaultWConfig={theme:"light", spa:{basename:""}};
const wc={
  init: function(wconfig={}){
    window.wconfig=Object.assign(defaultWConfig, wconfig);
    window.wconfig.prefix='w'; // force prefix to 'w'
    this.setTheme(window.wconfig.theme);
  },
  setTheme: function(name) {
    Theme.setElement(name);
  }
};

export default wc;
export {
  AlertDialog, Button,
  Calendar, Camera, Card, CheckBox, Code, ConfirmDialog,
  Dialog, DisplayHeading,
  Form, Grid,
  Heading, Hero,
  Icon, IconButton,
  List, ListItem,
  Nav, NavPart,
  Option, Quote, Radio,
  Section, Select, SPALink, SPAPage, SideMenu, SideMenuContent, SideMenuLayout,
  TextInput, TextArea, TypeWriter
};