<template>
      <div>
          <div class="top_tab">
              <ul>
                  <li id="mail"><a href='{url:/ucenter/account_log}'>交易记录</a></li>
                  <li class="on" id="mobile"><a href='{url:/ucenter/withdraw}'>申请提现</a></li>
              </ul>
          </div>
          <div class="body_page_box">
              <div class="prompt">
                  <p>账户余额：￥{$this->memberRow['balance']}</p>
              </div>
              <div class="list-group">
                  <div class="list-group-item">
                      <h4 class="list-group-item-heading"><strong>{$item['amount']}元</strong><span>{$item['time']}</span></h4>
                      <p class="list-group-item-text" style="padding-bottom:6px; color:#666;">{$item['note']}</p>
                      <!--{if:$item['re_note']}-->
                      <div class="prompw">{$item['re_note']}</div>
                      <!--{/if}-->
                      <div class="form-group has-feedback" style="height:20px; line-height:20px; margin-bottom:0px;">
                          <div class="pull-left">{if:$item['status'] == 0}<span class="on">{echo:AccountLog::getWithdrawStatus($item['status'])}</span>{else:}<span class="ok">{echo:AccountLog::getWithdrawStatus($item['status'])}</span>{/if}</div>
                          <div class="pull-right">{if:$item['status']==0}<a href="javascript:delModel({link:'{url:/ucenter/withdraw_del/id/$item[id]}'});">取消</a>{/if}</div>
                      </div>
                  </div>
              </div>
              <form action='{url:/ucenter/withdraw_act}' method='post' name='withdraw'>
                  <div class="form-group has-feedback">
                      <label class="control-label" for="inputWarning2">收款人姓名</label>
                      <input type="text" class="form-control" name='name' pattern='required' alt='请填写真实的收款人姓名'/>
                  </div>

                  <div class="form-group has-feedback">
                      <label class="control-label" for="inputWarning2">提现金额</label>
                      <input type="text" class="form-control" name='amount' pattern='float' alt='填写体现金额' />
                      <p class="help-block"> 要提现的金额，此数值不得大于当前的账户余额</p>
                  </div>

                  <div class="form-group has-feedback">
                      <label class="control-label" for="inputWarning2">备注</label>
                      <textarea name='note' class="form-control"  pattern='required' alt='填写一些必要的提现信息'></textarea>
                      <p class="help-block">填写必要的提现信息，如开户银行，帐号等</p>
                  </div>

                  <div class="form-group has-feedback">
                      <input class="btn btn-warning btn-lg btn-block" type="submit" value="提交提现" />
                  </div>
              </form>
          </div>
      </div>
</template>

<script>
    export default {
        name: "withdraw"
    }
</script>

<style scoped>

</style>