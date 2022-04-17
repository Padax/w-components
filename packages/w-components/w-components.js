import Nav from "./components/layout/nav/Nav.js";
import NavPart from "./components/layout/nav/NavPart.js";
import Grid from "./components/layout/Grid.js";
import Section from "./components/layout/Section.js";
import Hero from "./components/layout/Hero.js";
import Card from "./components/layout/Card.js";
import Button from "./components/button/Button.js";
import IconButton from "./components/button/IconButton.js";
import Dialog from "./components/dialog/Dialog.js";
import AlertDialog from "./components/dialog/AlertDialog.js";
import ConfirmDialog from "./components/dialog/ConfirmDialog.js";
import Calendar from "./components/Calendar.js";
import Camera from "./components/Camera.js";
import Heading from "./components/Heading.js";
import DisplayHeading from "./components/DisplayHeading.js";
import Quote from "./components/Quote.js";
import List from "./components/List.js";
import ListItem from "./components/ListItem.js";
import TypeWriter from "./components/TypeWriter.js";
import Code from "./components/Code.js";
import Form from "./components/form/Form.js";
import TextInput from "./components/form/TextInput.js";
import TextArea from "./components/form/TextArea.js";
import CheckBox from "./components/form/checkable/Checkbox.js";
import Radio from "./components/form/checkable/Radio.js";
import Select from "./components/form/Select.js";
import Option from "./components/form/Option.js";
import SPALink from "./components/spa/SPALink.js";
import SPAPage from "./components/spa/SPAPage.js";
import Icon from "./components/Icon.js";

export default {
  Button, IconButton, Icon,
  Calendar, Camera, Card, Code, Quote, TypeWriter,
  Dialog, AlertDialog, ConfirmDialog,
  Grid, Hero, Section,
  Heading, DisplayHeading,
  List, ListItem,
  Nav, NavPart,
  SPALink, SPAPage,
  
  // Form elements should be loaded before Form
  TextInput, TextArea, CheckBox, Radio, Select, Option, Form
};