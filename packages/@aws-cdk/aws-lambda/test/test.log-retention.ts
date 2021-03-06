import { expect, haveResource } from '@aws-cdk/assert';
import logs = require('@aws-cdk/aws-logs');
import cdk = require('@aws-cdk/core');
import { Test } from 'nodeunit';
import { LogRetention } from '../lib/log-retention';

// tslint:disable:object-literal-key-quotes

export = {
  'log retention construct'(test: Test) {
    // GIVEN
    const stack = new cdk.Stack();

    // WHEN
    new LogRetention(stack, 'MyLambda', {
      logGroupName: 'group',
      retention: logs.RetentionDays.ONE_MONTH
    });

    // THEN
    expect(stack).to(haveResource('AWS::IAM::Policy', {
      "PolicyDocument": {
        "Statement": [
          {
            "Action": [
              "logs:PutRetentionPolicy",
              "logs:DeleteRetentionPolicy"
            ],
            "Effect": "Allow",
            "Resource": "*"
          }
        ],
        "Version": "2012-10-17"
      },
      "PolicyName": "LogRetentionaae0aa3c5b4d4f87b02d85b201efdd8aServiceRoleDefaultPolicyADDA7DEB",
      "Roles": [
        {
          "Ref": "LogRetentionaae0aa3c5b4d4f87b02d85b201efdd8aServiceRole9741ECFB"
        }
      ]
    }));

    expect(stack).to(haveResource('Custom::LogRetention', {
      "ServiceToken": {
        "Fn::GetAtt": [
          "LogRetentionaae0aa3c5b4d4f87b02d85b201efdd8aFD4BFC8A",
          "Arn"
        ]
      },
      "LogGroupName": "group",
      "RetentionInDays": 30
    }));

    test.done();

  }
};
