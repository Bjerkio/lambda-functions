'use strict';

import { Return } from '../api/return';
import { Service } from '../dynamodb/service';

const service = new Service((<any> process).env.TABLENAME, (<any> process).env.KEY_ID);
const ret = new Return;

module.exports.handler = (event: any, context: any, callback: any) => {
  ret.cb(callback);

  if(process.env.PERSONAL_RESOURCE){
    const userId = event.requestContext.authorizer.principalId;
    service.setUserId(userId);
  }

  const itemId: string = event.pathParameters[(<any> process).env.KEY_ID];

  service.get(itemId)
          .then((result: any) => ret.parseData(result.Item));
}