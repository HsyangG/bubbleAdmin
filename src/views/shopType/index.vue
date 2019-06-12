<template>
  <div class="shop_type">
    <div class="filterContainer">
      <a-button type="primary" @click="onAdd">添加</a-button>
    </div>

    <a-modal
      :title="title"
      width="800px"
      :visible="visible"
      @ok="handleOK"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel">
      <a-form :form="form">
        <a-form-item label="商品类型" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
          <a-input placeholder="请输入商品类型" v-model="form.type"></a-input>
        </a-form-item>
        <a-form-item label="类型名称" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
          <a-input placeholder="请输入类型名称" v-model="form.name"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>

    <a-table
      :dataSource="list"
      bordered
      row-key="id"
      :pagination="pagination"
      style="background: #fff;margin-top: 20px;">
      <a-table-column title="ID" align="center" width="90px">
        <template slot-scope="scope">
          {{scope.id}}
        </template>
      </a-table-column>
      <a-table-column title="商品类型" align="center" width="110px">
        <template slot-scope="scope">{{scope.type}}</template>
      </a-table-column>
      <a-table-column title="类型名称" align="center" width="110px">
        <template slot-scope="scope">{{scope.name}}</template>
      </a-table-column>
      <a-table-column title="操作" align="center" width="200px">
        <template slot-scope="scope">
          <a-button type="primary" size="small" style="margin-right: 20px;" @click="onEdit(scope)">修改</a-button>
          <a-button type="primary" size="small" style="margin-right: 20px;" @click="handleDelete(scope)">删除</a-button>
        </template>
      </a-table-column>
    </a-table>
  </div>
</template>
<script>
import request from '@/utils/request'
import { Promise } from 'q';
export default {
  data () {
    return {
      list: [],
      pagination: {
        defaultPageSize: 5,
        pageSizeOptions: ['5','10','20','30','50'],
        total: 10,
        showSizeChanger: true,
        showQuickJumper: true
      },
      form: {
        id: '',
        type: '',
        name: ''
      },
      title: '添加类型',
      visible: false,
      confirmLoading: false
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      request({
        url: '/api/shops/type/index',
        method: 'get'
      })
      .then((response) => {
        // console.log(response)
        this.list = response.data
        this.pagination.total = response.total
      }).catch((err) => {
        console.log(err)
      });
    },
    resetForm () {
      this.form = {
        id: '',
        type: '',
        name: ''
      }
    },
    onAdd () {
      this.title = '添加类型'
      this.resetForm()
      this.visible = true
    },
    handleOK () {
      if (!this.form.type) {
        this.$message.warning('商品类型是必须的')
        return false
      }
      if (!this.form.name) {
        this.$message.warning('类型名称是必须的')
        return false
      }
      this.confirmLoading = true
      request({
        url: '/api/shops/type/store',
        method: 'post',
        data: this.form
      })
      .then((response) => {
        console.log(response)
        this.getList()
        this.confirmLoading = false
        this.visible = false
        this.$message.success('操作成功')
      }).catch((err) => {
        console.log(err)
      });
    },
    handleCancel () {
      this.confirmLoading = false
      this.visible = false
    },
    onEdit (row) {
      this.title = '修改类型'
      this.form = row,
      this.visible = true
    },
    handleDelete (row) {
      let _this = this
      this.$confirm({
        content: '此操作将会删除该类型，是否继续',
        onOk () {
          return new Promise((resolve, reject) => {
            request({
              url: '/api/shops/type/delete',
              method: 'post',
              data: {
                id: row.id
              }
            })
            .then((response) => {
              _this.getList()
              _this.$message.success('操作成功')
              resolve()
            }).catch((err) => {
              _this.$message.error('操作失败')
              reject()
            });
          })
        },
        onCancel () {
          _this.$message.info('已取消')
        }
      })
    }
  }
}
</script>
