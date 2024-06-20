import _isFunction from "lodash/isFunction";
import _isArray from "lodash/isArray";
import GML from "ol/format/GML";
import { api } from "boot/axios";
import { Buffer } from "buffer";
import { Point, LineString, Polygon } from 'ol/geom';
import { Feature } from 'ol';

import { i18n } from "boot/i18n.js";
import {
  Notify
} from "quasar"
const $t = i18n.global.t;
const username = process.env.GEO_SERVER_ADMIN;
const password = process.env.GEO_SERVER_PASSWORD;
const encodedCredentials = Buffer.from(`${username}:${password}`).toString(
  "base64"
);
export const addXML = ({feature, workspace, layer, resolve = () => {}}) => {
  const gml = new GML({
    srsName: "urn:ogc:def:crs:EPSG::5899",
    multiCurve: true,
    multiSurface: true,
    surface: true,
    curve: true,
  });
  const geometryProperties = feature.getProperties();
  delete geometryProperties.geometry;
  const xmlProperties = Object.entries(geometryProperties).reduce((acc, item) => {
    acc =
      acc +
      `<${workspace}:${item[0]}>` +
      item[1] +
      `</${workspace}:${item[0]}>`;
    return acc;
  }, "");
  const geometryNode = new XMLSerializer().serializeToString(
    gml.writeGeometryNode(feature.getGeometry())
  );
  const xmlGeometry = geometryNode
    .replace(/</g, "<gml:")
    .replace(/<gml:\/\s*/g, "</gml:");
  const transactionXML =
    '<wfs:Transaction service="WFS" version="1.1.0"\n' +
    `xmlns:${workspace}="http://www.openplans.org/${workspace}"\n` +
    'xmlns:ogc="http://www.opengis.net/ogc"\n' +
    'xmlns:wfs="http://www.opengis.net/wfs"\n' +
    'xmlns:gml="http://www.opengis.net/gml"\n' +
    'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n' +
    'xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/WFS-transaction.xsd">\n' +
    "<wfs:Insert>\n" +
    `<feature:${layer} xmlns:feature="${workspace}">\n` +
    xmlGeometry +
    xmlProperties +
    `</feature:${layer}>\n` +
    "</wfs:Insert>\n" +
    "</wfs:Transaction>\n";
  const insertRequestUrl = `${process.env.GEO_SERVER_URL}/${workspace}/wfs`;
  console.log(geometryProperties);
  
  console.log("insertRequestUrl:", insertRequestUrl);
  console.log("transactionXML:", transactionXML);
  fetch(insertRequestUrl, {
    mode:'cors',
    method: "POST",
    body: transactionXML,
    headers: {
      "Content-Type": "text/xml",
      Authorization: `Basic ${encodedCredentials}`,
    },
  })
    .then(function (response) {
     if (response.status !== 200 || response.status === 400) {
        Notify.create({
          message:  $t("Cannot insert feature!"),
          type: "negative",
        })
      } else {
        Notify.create({
          message:  $t('Insert success!'),
          color: 'primary',
          icon: 'check_circle'
        })
        if(_isFunction(resolve)) resolve()

      }
      return response.text();
    })
    .then(function (responseText) {
      console.log(responseText);  
      // Lấy id tree
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(responseText, "application/xml");
      const namespaces = {
          ogc: "http://www.opengis.net/ogc"
      };
      const featureIdElement = xmlDoc.evaluate('//ogc:FeatureId', xmlDoc, prefix => namespaces[prefix] || null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      const id_tree = featureIdElement ? featureIdElement.getAttribute('fid') : null;

      // Gọi hàm tạo database
      api.post("features_management", {
        properties: geometryProperties,
        name: id_tree,
        layer_name: id_tree.split('.')[0],
      });
      //-------------------------
      // Print the result
      console.log(id_tree.split('.')[0]);
      // Handle the response
    });
};


export const deleteXML = ({feature, workspace, layer, resolve = () => {}}) => {
  const rid = feature?.getId?.() || null
  const transactionXML =
    '<wfs:Transaction xmlns:wfs="http://www.opengis.net/wfs/2.0" xmlns:fes="http://www.opengis.net/fes/2.0" xmlns:gml="http://www.opengis.net/gml/3.2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs/2.0 http://schemas.opengis.net/wfs/2.0/wfs.xsd">' +
    `<wfs:Delete typeName="feature:${layer}" xmlns:feature="${workspace}">` +
    "<wfs:Filter>" +
    "<fes:Filter>" +
    `<fes:ResourceId rid="${rid}" />` +
    "</fes:Filter>" +
    "</wfs:Filter>" +
    "</wfs:Delete>" +
    "</wfs:Transaction>";
  const insertRequestUrl = `${process.env.GEO_SERVER_URL}/${workspace}/wfs`;
  fetch(insertRequestUrl, {
    mode:'cors',
    method: "POST",
    body: transactionXML,
    headers: {
      "Content-Type": "text/xml",
      Authorization: `Basic ${encodedCredentials}`,
    },
  })
    .then(function (response) {
      console.log("test3")
      if (response.status !== 200 || response.status === 400) {
        Notify.create({
          message:  $t("Cannot delete feature!"),
          type: "negative",
        })
      } else {
        Notify.create({
          message:  $t('Delete success!'),
          color: 'primary',
          icon: 'check_circle'
        })
        if(_isFunction(resolve)) resolve()
      }
      return response.text();
    })
    .then(function (responseText) {
      console.log("test2")
      // Handle the response
    });
};

export const updateXML = ({feature, workspace='danang', layer, resolve = () => {}}) => {
  const gml = new GML({
    srsName: "urn:ogc:def:crs:EPSG::5899",
    multiCurve: true,
    multiSurface: true,
    surface: true,
    curve: true,
  });
  const rid = feature?.getId?.() || null
  const a = feature.getProperties()
  debugger
  const geometryNode = new XMLSerializer().serializeToString(
    gml.writeGeometryNode(feature.getGeometry())
  );

  const xmlGeometry = geometryNode
    .replace(/</g, "<gml:")
    .replace(/<gml:\/\s*/g, "</gml:");
  delete a.geometry
  const xmlProperties = Object.entries(a).reduce((acc, item) => {
    acc =
      acc +
      '<wfs:Property>\n<wfs:ValueReference>' + item[0] + '</wfs:ValueReference>\n' +'<wfs:Value>' + item[1] + '</wfs:Value>\n</wfs:Property>\n';
    return acc;
  }, '');
  const transactionXML =
    '<wfs:Transaction xmlns:wfs="http://www.opengis.net/wfs/2.0" xmlns:fes="http://www.opengis.net/fes/2.0" xmlns:gml="http://www.opengis.net/gml/3.2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs/2.0 http://schemas.opengis.net/wfs/2.0/wfs.xsd">\n' +
    `<wfs:Update typeName="feature:${layer}" xmlns:feature="${workspace}">\n` +
    xmlGeometry +
    xmlProperties +
    '<fes:Filter>\n' +
    `<fes:ResourceId rid="${rid}" />\n` +
    '</fes:Filter>\n' +
    '</wfs:Update>\n' +
    '</wfs:Transaction>\n';
  
  // Update tree
  const insertRequestUrl = `${process.env.GEO_SERVER_URL}/${workspace}/wfs`;
  fetch(insertRequestUrl, {
    mode:'cors',
    method: "POST", 
    body: transactionXML,
    headers: {
      "Content-Type": "text/xml",
      Authorization: `Basic ${encodedCredentials}`,
    },
  })
    .then(function (response) {
      if (response.status !== 200 || response.status === 400) {
        Notify.create({
          message:  $t("Cannot update feature!"),
          type: "negative",
        })
      } else {
        Notify.create({
          message:  $t('Update success!'),
          color: 'primary',
          icon: 'check_circle'
        })
        if(_isFunction(resolve)) resolve()
      }
      return response.text();
    })
    .then(function (responseText) {
      console.log("Failed!")
      // Handle the response
    });
};
// 