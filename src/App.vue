<template>
  <div id="app">
    <div class="layout">
      <Header>
        <div class="layout-logo"></div>
        <div class="layout-title">
          移动医疗信息平台
        </div>
      </Header>
      <Layout :style="{minHeight: '100vh'}">
        <Sider :style="{padding:'10px 0'}" class="white-bg">
          <Menu ref="menu" :theme="'light'" active-name="'visit'" width="auto" @on-select="onSelected">
              <MenuItem name="visit">
                <Icon type="md-document" />
                <span>就诊</span>
              </MenuItem>
              <MenuItem name="examination">
                <Icon type="md-pulse" />
                <span>检查</span>
              </MenuItem>
          </Menu>
        </Sider>
        <Layout>
          <Content :style="{padding: '10px 16px 16px'}">
              <router-view/>
          </Content>
        </Layout>
      </Layout>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
  },
  computed: {
  },
  methods: {
    /**
     * route to sub page
     * @param name router's name
     */
    onSelected (name) {
      this.$router.push(name)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "scss/index.css";

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .layout-title {
    float: left;
    left: 20px;
    position: relative;
    font-size: 16px;
    color: white;
  }
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-logo {
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
  }
  .menu-item  {
    span {
      display: inline-block;
      overflow: hidden;
      width: 69px;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: bottom;
      transition: width .2s ease .2s;
    }

    i {
      transform: translateX(0px);
      transition: font-size .2s ease, transform .2s ease;
      vertical-align: middle;
      font-size: 16px;
    }
  }

  .collapsed-menu {
    span {
      width: 0;
      transition: width .2s ease;
    }
    i {
      transform: translateX(5px);
      transition: font-size .2s ease .2s, transform .2s ease .2s;
      vertical-align: middle;
      font-size: 22px;
    }
  }

</style>
