<template lang="html">
  <div class="">
    <el-form ref="form" label-width="80px">
      <el-form-item label="公司名称">
        <el-input ></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="8">
          <el-form-item label="电话1">
            <el-input >
              <el-button slot="append" type="success">拨打</el-button>
              <!-- <el-button icon="search"></el-button> -->
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电话2">
            <el-input >
              <el-button slot="append" type="success">拨打</el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电话3">
            <el-input >
              <el-button slot="append" type="success">拨打</el-button>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="行业类别">
            <el-select placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="省份">
            <el-select placeholder="省份">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="城市">
            <el-select placeholder="城市">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="地址">
        <el-input ></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="8">
          <el-form-item :label-width="'100px'"	 label="联系人姓名">
            <el-input > </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="职位">
            <el-input > </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码">
            <el-input >
              <el-button slot="append" type="success">拨打</el-button>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="证件类型">
            <el-select placeholder="省份">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="证件号码">
            <el-input > </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="QQ">
            <el-input > </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="邮箱">
        <el-input ></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
}
</script>
<style lang="sass">
</style>
