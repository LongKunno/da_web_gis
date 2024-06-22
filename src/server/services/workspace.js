const fetch = require("node-fetch");
const dotenv = require("dotenv").config();

const username = dotenv.parsed.GEO_SERVER_ADMIN;
const password = dotenv.parsed.GEO_SERVER_PASSWORD;
const baseUrl = dotenv.parsed.GEO_SERVER_URL;
const relativeUrl = "/rest/workspaces.json";
const url = `${baseUrl}${relativeUrl}`;
const encodedCredentials = Buffer.from(`${username}:${password}`).toString(
  "base64"
);
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  getWorkspace: async (req, res) => {
    try {
      const response = await fetch(url, {
        headers: {
          Accept: "application/json",
          Authorization: `Basic ${encodedCredentials}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // Process the workspace data here
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  syncWorkspace: async (req, res) => {
    try {
      const { workspaces = ["danang"] } = req.body;
      const responseWorkspace = await fetch(url, {
        headers: {
          Accept: "application/json",
          Authorization: `Basic ${encodedCredentials}`,
        },
      });
      if (!responseWorkspace.ok) {
        throw new Error(`HTTP error! Status: ${responseWorkspace.status}`);
      }
      const workspaceJson= await responseWorkspace.json();
      const workspaceAPI = workspaceJson?.workspaces?.workspace || workspaceJson?.workspace 
      if (workspaces.length > 0) {
        for (const ws of workspaces) {
          const workspace = workspaceAPI.find((api) => api.name === ws);
          const _response = await fetch(
            `${baseUrl}/rest/workspaces/${workspace.name}/datastores.json`,
            {
              headers: {
                Accept: "application/json",
                Authorization: `Basic ${encodedCredentials}`,
              },
            }
          );
          if (!_response.ok) {
            throw new Error(`HTTP error! Status: ${_response.status}`);
          }
          const _responseJson = await _response.json();
          const dataStores =
            _responseJson?.dataStore || _responseJson?.dataStores?.dataStore || [];
          const mapLayers = await prisma.mapLayer.findMany({
            select: {
              url: true,
              id: true,
            },
            where: {
              location: {
                workspace: workspace.name,
              }
            }
          });
          for (const layer of dataStores) {
            try {
              const layerAPI = await fetch(
                `${baseUrl}/${workspace.name}/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=${layer.name}&maxFeatures=52000&outputFormat=application%2Fjson`,
                {
                  method: "GET",
                  headers: {
                    Accept: "application/json",
                    // Authorization: `Basic ${encodedCredentials}`,
                  },
                }
              )
              const layerJson = await layerAPI.json()
              await prisma.feature.createMany({
                data: layerJson.features.map((item) => ({
                  name: item.id || null,
                  properties: JSON.stringify(item.properties) || null,
                  layerId: mapLayers.find((e) => e.url === layer.name)?.id || undefined,
                })),
                skipDuplicates: true,
              });
            } catch (e){
              console.log(e);
            }
          }
        }
        res.status(200).json({message: "Done!"})
      } else {
        // Process the workspace data here
        res.json(data);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  get_chart_1: async (req, res) => {
    const data_return = {
      "list_data": [0],
      "categories": ["0"],
    }
    try {
      // lấy data init
      const today = new Date();
      const YearsAgo = new Date(today.getFullYear(), today.getMonth() - 6, 1);
      let currentDate = new Date(YearsAgo);
      const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

      while (currentDate <= endDate) {
        const nextMonth = new Date(currentDate);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
    
        const usersCount = await prisma.user.count({
          where: {
            createdAt: {
              lt: nextMonth,
            }
          }
        });

        data_return['list_data'].push(usersCount);
        data_return['categories'].push(`${currentDate.getMonth()+1}/${currentDate.getFullYear().toString().slice(-2)}`);
    
        currentDate = nextMonth;
      }
    
      await prisma.$disconnect();

      res.json(data_return);
    } catch (error) {
      console.log(error);
      res.json(data_return);
    }
  },
  get_chart_2: async (req, res) => {
    const data_return = {
      "list_data": [0],
      "categories": ["0"],
    }
    try {
      // lấy data init
      const today = new Date();
      const YearsAgo = new Date(today.getFullYear(), today.getMonth() - 6, 1);
      let currentDate = new Date(YearsAgo);
      const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

      while (currentDate <= endDate) {
        const nextMonth = new Date(currentDate);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
    
        const usersCount = await prisma.location.count({
          where: {
            createdAt: {
              lt: nextMonth,
            }
          }
        });

        data_return['list_data'].push(usersCount);
        data_return['categories'].push(`${currentDate.getMonth()+1}/${currentDate.getFullYear().toString().slice(-2)}`);
    
        currentDate = nextMonth;
      }
    
      await prisma.$disconnect();

      res.json(data_return);
    } catch (error) {
      console.log(error);
      res.json(data_return);
    }
  },
  get_chart_3: async (req, res) => {
    const data_return = {
      "list_data": [0],
      "categories": ["0"],
    }
    try {
      // lấy data init
      const today = new Date();
      const YearsAgo = new Date(today.getFullYear(), today.getMonth() - 6, 1);
      let currentDate = new Date(YearsAgo);
      const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

      while (currentDate <= endDate) {
        const nextMonth = new Date(currentDate);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
    
        const usersCount = await prisma.mapLayer.count({
          where: {
            createdAt: {
              lt: nextMonth,
            }
          }
        });

        data_return['list_data'].push(usersCount);
        data_return['categories'].push(`${currentDate.getMonth()+1}/${currentDate.getFullYear().toString().slice(-2)}`);
    
        currentDate = nextMonth;
      }
    
      await prisma.$disconnect();

      res.json(data_return);
    } catch (error) {
      console.log(error);
      res.json(data_return);
    }
  },
  get_chart_4: async (req, res) => {
    const data_return = {
      "list_data": [0],
      "categories": ["0"],
    }
    try {
      // lấy data init
      const today = new Date();
      const YearsAgo = new Date(today.getFullYear(), today.getMonth() - 6, 1);
      let currentDate = new Date(YearsAgo);
      const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

      while (currentDate <= endDate) {
        const nextMonth = new Date(currentDate);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
    
        const usersCount = await prisma.feature.count({
          where: {
            createdAt: {
              lt: nextMonth,
            }
          }
        });

        data_return['list_data'].push(usersCount);
        data_return['categories'].push(`${currentDate.getMonth()+1}/${currentDate.getFullYear().toString().slice(-2)}`);
    
        currentDate = nextMonth;
      }
    
      await prisma.$disconnect();

      res.json(data_return);
    } catch (error) {
      console.log(error);
      res.json(data_return);
    }
  },
  get_chart_5: async (req, res) => {
    const data_return = {
      "list_data": [],
      "categories": [],
    }
    try {
      // lấy data init
      const today = new Date();
      const YearsAgo = new Date(today.getFullYear() - 1, today.getMonth(), 1);
      let currentDate = new Date(YearsAgo);
      const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

      while (currentDate <= endDate) {
        const nextMonth = new Date(currentDate);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
    
        const usersCount = await prisma.feature.count({
          where: {
            name: {
              contains: "tree"
            },
            createdAt: {
              gte: currentDate,
              lt: nextMonth,
            }
          }
        });

        data_return['list_data'].push(usersCount);
        data_return['categories'].push(`${currentDate.getMonth()+1}/${currentDate.getFullYear().toString().slice(-2)}`);
    
        currentDate = nextMonth;
      }
    
      await prisma.$disconnect();

      res.json(data_return);
    } catch (error) {
      console.log(error);
      res.json(data_return);
    }
  },
  get_chart_6: async (req, res) => {
    const data_return = {
      "list_data": [],
    }
    try {
      const list_obj_feature_tree = await prisma.feature.findMany({
        where: {
          name: {
            contains: "tree"
          },
        }
      });
      // Lấy tất cả tên đường
      list_all_address = []
      for (const obj_feature of list_obj_feature_tree) {
        if (obj_feature.properties){
          try {
            dict_feature = JSON.parse(obj_feature.properties)
            if (dict_feature.hasOwnProperty('dia_chi') && dict_feature.dia_chi.trim() != "" ) {
              list_all_address.push(dict_feature.dia_chi);
            } else {
              list_all_address.push("No Address");
            }
            
          } catch {}

        }
      }

      let list_all_address_no_loop = [...new Set(list_all_address)];

      for (const address_no_loop of list_all_address_no_loop){
        count_address = 0
        for (const address_loop of list_all_address){
          if (address_loop == address_no_loop){
            count_address += 1;
          }
        }
        data_return['list_data'].push({x: address_no_loop, y: count_address});
      }
    

      await prisma.$disconnect();
      res.json(data_return);

    } catch (error) {
      res.json(data_return);
    }
  },
};
