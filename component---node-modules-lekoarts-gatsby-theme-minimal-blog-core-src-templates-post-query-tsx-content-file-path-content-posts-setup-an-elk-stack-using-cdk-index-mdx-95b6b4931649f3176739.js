"use strict";(self.webpackChunkminimal_blog=self.webpackChunkminimal_blog||[]).push([[293],{8263:function(e,n,t){t.r(n),t.d(n,{Head:function(){return l.F},default:function(){return c}});var a=t(7294),o=t(1151);function s(e){const n=Object.assign({h2:"h2",p:"p",code:"code",pre:"pre",ul:"ul",li:"li",a:"a",strong:"strong",span:"span"},(0,o.ah)(),e.components);return a.createElement(a.Fragment,null,a.createElement(n.h2,null,"Prerequisites"),"\n",a.createElement(n.p,null,"Make sure you have installed ",a.createElement(n.code,null,"Node.js")," 10.13.0 or later."),"\n",a.createElement(n.p,null,"Make sure you have configured your workstation with your ",a.createElement(n.code,null,"aws_access_key_id")," & ",a.createElement(n.code,null,"aws_secret_access_key"),". If you have the ",a.createElement(n.code,null,"AWS CLI")," installed, run the following command."),"\n",a.createElement(n.pre,null,a.createElement(n.code,{className:"language-bash"},"# Provide your AWS access key ID, secret access key, and default region when prompted.\naws configure\n")),"\n",a.createElement(n.p,null,"Make sure you have installed the AWS CDK Toolkit globally."),"\n",a.createElement(n.pre,null,a.createElement(n.code,{className:"language-bash"},"npm install -g aws-cdk\ncdk --version\n")),"\n",a.createElement(n.h2,null,"Initial Setup"),"\n",a.createElement(n.p,null,"In this tutorial, we will use ",a.createElement(n.code,null,"TypeScript")," for the demo."),"\n",a.createElement(n.p,null,"Let's initialize an empty AWS CDK project."),"\n",a.createElement(n.pre,null,a.createElement(n.code,{className:"language-bash"},"mkdir cdk-elk && cd $_\ncdk init app --language typescript\n")),"\n",a.createElement(n.p,null,"Run the following command to verify that everything works correctly."),"\n",a.createElement(n.pre,null,a.createElement(n.code,{className:"language-bash"},"npm run cdk synth\n")),"\n",a.createElement(n.p,null,"This will output an empty CloudFormation template inside ",a.createElement(n.code,null,"cdk.out")," folder. You should see a file named ",a.createElement(n.code,null,"CdkElkStack.template.json")," created."),"\n",a.createElement(n.h2,null,"Boostraping"),"\n",a.createElement(n.p,null,"Provision resources the AWS CDK needs to perform the deployment, e.g S3 bucket"),"\n",a.createElement(n.pre,null,a.createElement(n.code,{className:"language-bash"},"cdk bootstrap\n ⏳  Bootstrapping environment aws://111111111111/ap-southeast-1...\nTrusted accounts for deployment: (none)\nTrusted accounts for lookup: (none)\nUsing default execution policy of 'arn:aws:iam::aws:policy/AdministratorAccess'. Pass '--cloudformation-execution-policies' to customize.\n ✅  Environment aws://111111111111/ap-southeast-1 bootstrapped (no changes).\n")),"\n",a.createElement(n.h2,null,"Create an AWS Cognito User Pool"),"\n",a.createElement(n.p,null,"Add an import statement at the beginning of ",a.createElement(n.code,null,"lib/cdk-elk-stack.ts")),"\n",a.createElement(n.pre,null,a.createElement(n.code,Object.assign({3:!0},{className:"language-js"},{"9-25":!0}),'import { Stack, StackProps } from "aws-cdk-lib";\nimport { Construct } from "constructs";\nimport * as cognito from "aws-cdk-lib/aws-cognito";\n\nexport class CdkElkStack extends Stack {\n  constructor(scope: Construct, id: string, props?: StackProps) {\n    super(scope, id, props);\n\n    const userPool = new cognito.UserPool(this, "UserPool", {\n      userPoolName: `${Stack.of(this).stackName}UserPool`,\n      autoVerify: {\n        email: true,\n      },\n      standardAttributes: {\n        email: {\n          mutable: true,\n          required: true,\n        },\n      },\n    });\n    userPool.addDomain("UserPoolDomain", {\n      cognitoDomain: {\n        domainPrefix: "cdk-elk",\n      },\n    });\n  }\n}\n')),"\n",a.createElement(n.p,null,"A user pool is a user directory that stores your users that use to login to Kibana. We also need to specify the domain prefix for the Cognito login URL."),"\n",a.createElement(n.h2,null,"Create an AWS Cognito Identity Pool"),"\n",a.createElement(n.p,null,"Note: Here we omitted the code to create user pool"),"\n",a.createElement(n.pre,null,a.createElement(n.code,Object.assign({className:"language-js"},{"11-41":!0}),'import { Stack, StackProps } from "aws-cdk-lib";\nimport { Construct } from "constructs";\nimport * as cognito from "aws-cdk-lib/aws-cognito";\n\nexport class CdkElkStack extends Stack {\n  constructor(scope: Construct, id: string, props?: StackProps) {\n    super(scope, id, props);\n\n    // User pool ...\n\n    const identityPool = new cognito.CfnIdentityPool(this, "IdentityPool", {\n      identityPoolName: `${Stack.of(this).stackName}IdentityPool`,\n      allowUnauthenticatedIdentities: false,\n    });\n\n    // See https://docs.aws.amazon.com/cognito/latest/developerguide/role-based-access-control.html\n    const authenticatedRole = new iam.Role(this, "AuthenticatedRole", {\n      assumedBy: new iam.FederatedPrincipal(\n        "cognito-identity.amazonaws.com",\n        {\n          StringEquals: {\n            "cognito-identity.amazonaws.com:aud": identityPool.ref,\n          },\n          "ForAnyValue:StringLike": {\n            "cognito-identity.amazonaws.com:amr": "authenticated",\n          },\n        },\n        "sts:AssumeRoleWithWebIdentity"\n      ),\n    });\n\n    new cognito.CfnIdentityPoolRoleAttachment(\n      this,\n      "IdentityPoolRoleAttachment",\n      {\n        identityPoolId: identityPool.ref,\n        roles: {\n          authenticated: authenticatedRole.roleArn,\n        },\n      }\n    );\n  }\n}\n')),"\n",a.createElement(n.p,null,"A few things to notice:"),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"Identity pool creates unique identities for the authenticated user and attaches a role to that user."),"\n",a.createElement(n.li,null,"The role defines the permissions to access the AWS resources."),"\n",a.createElement(n.li,null,"Both user pool & identity pool will be used when we define the ES domain."),"\n"),"\n",a.createElement(n.h2,null,"Create an ES domain"),"\n",a.createElement(n.p,null,"Note: Here we omitted the code to create user pool & identity pool"),"\n",a.createElement(n.pre,null,a.createElement(n.code,Object.assign({1:!0},{className:"language-js"},{"4-7":!0},{"17-62":!0}),'import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";\nimport { Construct } from "constructs";\nimport * as cognito from "aws-cdk-lib/aws-cognito";\nimport * as iam from "aws-cdk-lib/aws-iam";\nimport * as es from "aws-cdk-lib/aws-elasticsearch";\nimport { EbsDeviceVolumeType } from "aws-cdk-lib/aws-ec2";\nimport { ArnPrincipal, Effect } from "aws-cdk-lib/aws-iam";\n\nexport class CdkElkStack extends Stack {\n  constructor(scope: Construct, id: string, props?: StackProps) {\n    super(scope, id, props);\n\n    // User pool ...\n\n    // Identity pool ...\n\n    // Allow Amazon ES to access Cognito\n    const esRole = new iam.Role(this, "EsRole", {\n      assumedBy: new iam.ServicePrincipal("es.amazonaws.com"),\n    });\n    esRole.addManagedPolicy({\n      managedPolicyArn: "arn:aws:iam::aws:policy/AmazonESCognitoAccess",\n    });\n\n    const domain = new es.Domain(this, "Elasticsearch", {\n      domainName: "cdk-elk",\n      version: es.ElasticsearchVersion.V7_10,\n      enableVersionUpgrade: true, // This allow in-place Elasticsearch version upgrade\n      capacity: {\n        dataNodeInstanceType: "t3.small.elasticsearch",\n        dataNodes: 1, // For testing purpose, we only create 1 instance\n      },\n      ebs: {\n        // Attach a 30GB GP2 volume\n        enabled: true,\n        volumeSize: 30,\n        volumeType: EbsDeviceVolumeType.GP2,\n      },\n      accessPolicies: [\n        // Allow authenticated users to access Kibana\n        new iam.PolicyStatement({\n          effect: Effect.ALLOW,\n          principals: [new ArnPrincipal(authenticatedRole.roleArn)],\n          actions: ["es:ESHttp*"],\n          resources: [\n            `arn:aws:es:${Stack.of(this).region}:${\n              Stack.of(this).account\n            }:domain/cdk-elk/*`,\n          ],\n        }),\n      ],\n      cognitoKibanaAuth: {\n        userPoolId: userPool.userPoolId,\n        identityPoolId: identityPool.ref,\n        role: esRole,\n      },\n    });\n\n    new CfnOutput(this, "ESKibanaUrl", {\n      description: "Elastic Search Kibana Endpoint.",\n      value: `https://${domain.domainEndpoint}/_plugin/kibana/`,\n    });\n  }\n}\n')),"\n",a.createElement(n.p,null,"What's going on here?"),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"We declared an ",a.createElement(n.code,null,"IAM")," role that allows Amazon ES to configure Cognito authentication for Kibana."),"\n",a.createElement(n.li,null,"We defined an ES domain with the access policies that allow the authenticated role we created previously to access it."),"\n",a.createElement(n.li,null,"We output the Kibana URL after the domain is created."),"\n"),"\n",a.createElement(n.h2,null,"Deploy the stack"),"\n",a.createElement(n.pre,null,a.createElement(n.code,{className:"language-bash"},"cdk deploy\nThis deployment will make potentially sensitive changes according to your current security approval level (--require-approval broadening).\nPlease confirm you intend to make the following modifications:\n\n...\n\nDo you wish to deploy these changes (y/n)? y\nCdkElkStack: deploying...\n[0%] start: Publishing 70893b631249dc61260989e92e90d60ae94fbbec490a1e065680d77383084d8d:current_account-current_region\n[50%] success: Published 70893b631249dc61260989e92e90d60ae94fbbec490a1e065680d77383084d8d:current_account-current_region\n[50%] start: Publishing a1c436cf86403b1a2ba523b01c377b6cc24eddd60e78b76c9a24e5b28b071fd8:current_account-current_region\n[100%] success: Published a1c436cf86403b1a2ba523b01c377b6cc24eddd60e78b76c9a24e5b28b071fd8:current_account-current_region\nCdkElkStack: creating CloudFormation changeset...\n ✅  CdkElkStack\n\nOutputs:\nCdkElkStack.ESKibanaUrl = https://search-cdk-elk-ez34nbicxu5vu7abr7xz5sggiu.ap-southeast-1.es.amazonaws.com/_plugin/kibana/\n\nStack ARN:\narn:aws:cloudformation:ap-southeast-1:734282799255:stack/CdkElkStack/12327f80-7aa3-11ec-a781-0631acf18570\n")),"\n",a.createElement(n.h2,null,"Create an User in User Pool to access Kibana"),"\n",a.createElement(n.p,null,"Go to ",a.createElement(n.a,{href:"https://console.aws.amazon.com/cognito/home"},"AWS Cognito console")," to create a user to signin to Kibna.\nClick the ",a.createElement(n.strong,null,"Create User")," button in the ",a.createElement(n.strong,null,"Users")," tab of the ",a.createElement(n.strong,null,"Users and groups")," tab."),"\n",a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<span\n      class="gatsby-resp-image-wrapper"\n      style="position: relative; display: block; margin-left: auto; margin-right: auto; max-width: 960px; "\n    >\n      <span\n    class="gatsby-resp-image-background-image"\n    style="padding-bottom: 43.75%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAYAAAAywQxIAAAACXBIWXMAAAsTAAALEwEAmpwYAAABUUlEQVR42q2QyW7bMBRF9f/fFQTdBFl04dR1KsWR1NqaLE6Pk3MK0W7RbdEuDi7fwAvyVrt2YN+eOfQj7+NKvxjeJ83Xs7pxUuxPN/3yY2X3faUZFf2s6f5gq1/Piur5+Yn9fkfdNEzLwmoMq9Y4cQQvXJMv5OgREZwIxjm0dehfej9v/ap7e0EtPTEK1geG1TFpIaQrh8HyWF/41Fx4OiqM88QYyTmTcyKldNOcCDFiRKiaY0t/GrDi0U44r45RCYsRPh8nHl5nHg4Tj4eB83zBOse8rBjrCDGhjS0vDyEgIVC1XVe+asVhfGSViPYJ5RPWR9L1ik+Zi9tmt/5iQ9lTPrO4iMQMHx8476navsOFULKREIup2TQkjE9oHwtKYqm3uQ0JG2Jh2w0plxg2j+pbXTPOc3G399D/lu2euWtVvzUM0/Tb8F+pur4vGf4vw59tjrLUMR7OKgAAAABJRU5ErkJggg==\'); background-size: cover; display: block;"\n  ></span>\n  <img\n        class="gatsby-resp-image-image"\n        alt="user-pool-users"\n        title=""\n        src="/static/b5741cb47bcb0455e2ffe59ad4d0de80/7d769/user-pool-users.png"\n        srcset="/static/b5741cb47bcb0455e2ffe59ad4d0de80/5243c/user-pool-users.png 240w,\n/static/b5741cb47bcb0455e2ffe59ad4d0de80/ab158/user-pool-users.png 480w,\n/static/b5741cb47bcb0455e2ffe59ad4d0de80/7d769/user-pool-users.png 960w,\n/static/b5741cb47bcb0455e2ffe59ad4d0de80/87339/user-pool-users.png 1440w,\n/static/b5741cb47bcb0455e2ffe59ad4d0de80/b750f/user-pool-users.png 1546w"\n        sizes="(max-width: 960px) 100vw, 960px"\n        style="width:100%;height:100%;margin:0;vertical-align:middle;position:absolute;top:0;left:0;"\n        loading="lazy"\n        decoding="async"\n      />\n    </span>'}}),"\n",a.createElement(n.p,null,"Fill in the ",a.createElement(n.strong,null,"Username"),", ",a.createElement(n.strong,null,"Temporary password"),", and ",a.createElement(n.strong,null,"Email"),". Check ",a.createElement(n.strong,null,"Mark email as verified?")," and hit the ",a.createElement(n.strong,null,"Create User")," button to create the user."),"\n",a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<span\n      class="gatsby-resp-image-wrapper"\n      style="position: relative; display: block; margin-left: auto; margin-right: auto; max-width: 960px; "\n    >\n      <span\n    class="gatsby-resp-image-background-image"\n    style="padding-bottom: 42.91666666666667%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAYAAAAywQxIAAAACXBIWXMAAAsTAAALEwEAmpwYAAABy0lEQVR42m2RTWsTQRyH87XE7Mtk32c36aFVjy1+DA+eBAVB9KAnkYov2RZruk2qVjxJBcEv4E1SL00xXUOSTVqTPDJDEltw4OE/DDPP/OY/JeH6KBw/wI8khi24c/ce7z4c8HZ3j0bW5MWrup7v7jV5f/CR+w8eYlUcvd8LI40fRlT8iJJpGoiKwHFdZBxTNgze7OwwmU4oRgWz2YzpdIoai9pqtTBtG5kkhFJeouQ5Ahn5xLEkTqpcKRvU0y1+dbu0222OOx0GgwH9fp9er8dkMiHLMoQQJEmClJJ4TqSEFcfBDwKkFiZcNUzSrW1O85xut8toNKYoCs1wONQpG40Gtm1Tq9W0cEkcU3I9jyAMtV0lLJsW9TSlPxiQ5zm/ez2GSlYUek2NRpZhWOrJVYJIJYuXaUue52mzEibVGoZpkabb5Kc5neMTRsWYs/E55+M/jIszLWy29rGE0AGUTJ1fCtVnhFE0T5jgCotbj57z9PCIJ5++s/nliPrXn2wetnn2+Qcvv51w+/FrVO/juUTO+7fs4UKokFGIu3Id+9pNxNoG9uo6lbV1XRXW6gbOyg3khTMXudTDf9KAOPTm+MjQ13WBuvR/MiX8C2qPtG0JdEHJAAAAAElFTkSuQmCC\'); background-size: cover; display: block;"\n  ></span>\n  <img\n        class="gatsby-resp-image-image"\n        alt="user-pool-create-user"\n        title=""\n        src="/static/21217268db92a2cb152b26f1faecae3d/7d769/user-pool-create-user.png"\n        srcset="/static/21217268db92a2cb152b26f1faecae3d/5243c/user-pool-create-user.png 240w,\n/static/21217268db92a2cb152b26f1faecae3d/ab158/user-pool-create-user.png 480w,\n/static/21217268db92a2cb152b26f1faecae3d/7d769/user-pool-create-user.png 960w,\n/static/21217268db92a2cb152b26f1faecae3d/87339/user-pool-create-user.png 1440w,\n/static/21217268db92a2cb152b26f1faecae3d/48d3e/user-pool-create-user.png 1540w"\n        sizes="(max-width: 960px) 100vw, 960px"\n        style="width:100%;height:100%;margin:0;vertical-align:middle;position:absolute;top:0;left:0;"\n        loading="lazy"\n        decoding="async"\n      />\n    </span>'}}),"\n",a.createElement(n.p,null,"Go to the link display after the stack is created successfully to login to Kibana.\nWhen you log in for the first time, you will be prompted to change the temporary password."),"\n",a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<span\n      class="gatsby-resp-image-wrapper"\n      style="position: relative; display: block; margin-left: auto; margin-right: auto; max-width: 646px; "\n    >\n      <span\n    class="gatsby-resp-image-background-image"\n    style="padding-bottom: 57.08333333333333%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAABqklEQVR42o2S3UvCUBjG+yfrIupvqNv+A90U1OhbSoncRTBMC7WWu4hwziK6KAoh/MCG+DV1c5tze+KcUuzC1YGH5z0cnh/vOe9ZCoVCIAqHwwgGg4hGo8jlcshmswuVyWQgCAJisRjNkOyUszQPZFkWHMehXq+jUqmgWq3OfFrXajXqjUYDPM+DYZjFQHKYSqWg6zqGwyFUVUW/30e320Wv16N7UrfbbZCVz+fh8/kQiUS8gc1mE4qiUIimaTPYYDCg3ul0KFAURW+g3+9HOp3GaDRCq9WCZVmYX67rUnccB4Zh0HckmT+BpBMCNE0TjutSwLxs26b6N1BV+/j8VGCYJiYEMJlQje1vmdYYmj7CzQ9w4VCmQMt2MBjq0AwTumljbDu/rk66pEO5vfXukAwlmbwAX6pj/+YdR/kyDoR3nN19IHH/gWOxjBOxjEPhDclHBVeZazCMR4csw4BPXmDr/BXL2xLW92Ss7haxcfqMzdNnrO7IWNuTsRIpYDPxAv4yiwDr8Q8DgQDi8TgeSjLkojSTJBVQlCSUit+SpQKeHh/AcQmamQd+AcnGub80QpCfAAAAAElFTkSuQmCC\'); background-size: cover; display: block;"\n  ></span>\n  <img\n        class="gatsby-resp-image-image"\n        alt="cognito-signin"\n        title=""\n        src="/static/a70235a097224fd66a54561267b4c52c/87eb3/cognito-signin.png"\n        srcset="/static/a70235a097224fd66a54561267b4c52c/5243c/cognito-signin.png 240w,\n/static/a70235a097224fd66a54561267b4c52c/ab158/cognito-signin.png 480w,\n/static/a70235a097224fd66a54561267b4c52c/87eb3/cognito-signin.png 646w"\n        sizes="(max-width: 646px) 100vw, 646px"\n        style="width:100%;height:100%;margin:0;vertical-align:middle;position:absolute;top:0;left:0;"\n        loading="lazy"\n        decoding="async"\n      />\n    </span>'}}),"\n","\n","\n",a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<span\n      class="gatsby-resp-image-wrapper"\n      style="position: relative; display: block; margin-left: auto; margin-right: auto; max-width: 767px; "\n    >\n      <span\n    class="gatsby-resp-image-background-image"\n    style="padding-bottom: 64.58333333333334%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAAAsTAAALEwEAmpwYAAABmElEQVR42p2T0UvCYBTF/Z97sKfeQifp3CwWBCqU20jFnGVBEL34pixXA8UN9V0RFbflNk/cDxSyMuuDw+7ddn8759sWSafT2FY+n4eiKJBl+VupqgpJkpBKpb7MRrZP0E2NRgODwQC9Xo/JsqyNqKdrBE4kEhAEYTeQ53nYto0wDOG6LjzPg+M4m3qxWIBWrVZDPB6HKIo/AwlGT2w2m+h0OjAMA7quM1ftdpv1pmkycL1eRywW2w1cQwk2nU4xGo0wmUxYPR6PWe37/v4O18But4vZbMaABAiCgG0Bieo/Aeml9Pt9NrQeXq1Wn4DUa5q2v0OKPJ/PWUxyuXZKwH9Ftmwbfhhi4bhwHA+O6+F96WPpB+zoB+H+DinycDjcRN1e5HJvhymeh3QqQH1sIaq+4lDREZV1HN+YOCoaiCovOLhsIXlvoVSpguPiEHZ/h2mcZQRUnppI3ppIVts40QxIDybEuzckNQNc5QW5ZxvFcgUcx0EQfovM88henKMs51Eq5Jiur7IoXmU3fbGQQyYjsv3e/pc/AJtmIsvr5IMdAAAAAElFTkSuQmCC\'); background-size: cover; display: block;"\n  ></span>\n  <img\n        class="gatsby-resp-image-image"\n        alt="change-temp-password"\n        title=""\n        src="/static/89cb9dd7d72cb784954ff1d61e730630/2059a/change-temp-password.png"\n        srcset="/static/89cb9dd7d72cb784954ff1d61e730630/5243c/change-temp-password.png 240w,\n/static/89cb9dd7d72cb784954ff1d61e730630/ab158/change-temp-password.png 480w,\n/static/89cb9dd7d72cb784954ff1d61e730630/2059a/change-temp-password.png 767w"\n        sizes="(max-width: 767px) 100vw, 767px"\n        style="width:100%;height:100%;margin:0;vertical-align:middle;position:absolute;top:0;left:0;"\n        loading="lazy"\n        decoding="async"\n      />\n    </span>'}}),"\n",a.createElement(n.p,null,"Once you have reset the password, log in with the new password."),"\n",a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<span\n      class="gatsby-resp-image-wrapper"\n      style="position: relative; display: block; margin-left: auto; margin-right: auto; max-width: 767px; "\n    >\n      <span\n    class="gatsby-resp-image-background-image"\n    style="padding-bottom: 30.83333333333333%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAGCAYAAADDl76dAAAACXBIWXMAAAsTAAALEwEAmpwYAAABFUlEQVR42n2RT0sCYRCH/Ypdokvn6tyXWJfcd9+thT2oB3OX3DVb6B4VqCkVESFEtWCFmpjRHyw1eeIVA4l04GH4zTA/ZpiYaZpMI4Qgk9nGD/Lk/AB/CqV3cgFBfhfHcTAMg7/zsWkhpUkikaB6UqbbbtB6rNOc0Hioj7Xi+amJ53rouo6UcrahUKamoHReo3jT5ajWonrb4fSuw1nUoXTd5uCqycX9G4W9kLimIS1rtqEhBM6WJLlfYmmzzKJ5zEqywmqqwlqqwrJdZGHjkHX3Ej9fQI/H52+oUCdHUYSKr8E3759DXnsDXj769PpDRqPRuBeGIZqmYc3b8Pcp6XQa13XJZrPjrPAmWdU8z8O27X+f8gNexGQX4eCarAAAAABJRU5ErkJggg==\'); background-size: cover; display: block;"\n  ></span>\n  <img\n        class="gatsby-resp-image-image"\n        alt="cognito-signin-as"\n        title=""\n        src="/static/afd3f5a8a868d37e16b4b7b7f0f0765f/2059a/cognito-signin-as.png"\n        srcset="/static/afd3f5a8a868d37e16b4b7b7f0f0765f/5243c/cognito-signin-as.png 240w,\n/static/afd3f5a8a868d37e16b4b7b7f0f0765f/ab158/cognito-signin-as.png 480w,\n/static/afd3f5a8a868d37e16b4b7b7f0f0765f/2059a/cognito-signin-as.png 767w"\n        sizes="(max-width: 767px) 100vw, 767px"\n        style="width:100%;height:100%;margin:0;vertical-align:middle;position:absolute;top:0;left:0;"\n        loading="lazy"\n        decoding="async"\n      />\n    </span>'}}),"\n",a.createElement(n.p,null,"You should see this page after you log in successfully."),"\n",a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<span\n      class="gatsby-resp-image-wrapper"\n      style="position: relative; display: block; margin-left: auto; margin-right: auto; max-width: 773px; "\n    >\n      <span\n    class="gatsby-resp-image-background-image"\n    style="padding-bottom: 89.16666666666667%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAACXBIWXMAAAsTAAALEwEAmpwYAAACDElEQVR42p2Uy27TQBSGeRnegFfhEdjCC1AJFggJsWIFghUb2BW2SGwQFwlUKGmUpiSt4zilbZrEM2M79mQuHxqnAQQ0SRnpaI50xv98o/MfX5oZx6pwzmOdZ52zl5YV9cziHETHEcejDtaBNvb/BMPHxnm8g4FKOckmeE9Naqy/uGAqFFLlZPmUIisoS00qM4TKyYvyYoKVNjR2Wmw3muy2v9FstenFA3bbHT5tbbN/EJ9LeS6hsWG3P5vinMPaRd2uTxjoQjMqbTEGxkXJIFWkmUFkGl3N6vqvWCK4OFTngWwaIyvJZnPIlVtNrj7uUk3/fX6FIFh5gvj+mYdxhxtfPnL5wVuubWxitt5Q6jnZ2oKBzlSa8Vhwt/2V6zvveDpIKB7dYfbkNuXsIoRnHixKzcw6dGWpSoMxvrbP4eFxTbiWYIjgt+m0RAhFls19KGRGUVb1ZRMha4OHCE44VzAUAtloPKHXi0mShCjq1Xm/32d4enpmndB9g7UG5/0qQc8kFex19omTQ6Jen34yII6TOo+imG73gE53nzwvaspq6ZOtpyxy5HhIlo7IlaQoCpQMz89QSiGkRAhZky4VDIWw3reH3H/Z4t6LFh/2TnFAdXZZ+Fn8vsIE6VWCrxtHbDzf4eazBq+2j1ClYZRVTHKNmhq897XQfHerbDOf18UKeQhjFmH/GLu/Z/oH2WRsdruYUf4AAAAASUVORK5CYII=\'); background-size: cover; display: block;"\n  ></span>\n  <img\n        class="gatsby-resp-image-image"\n        alt="kibana"\n        title=""\n        src="/static/3ff59d59a58ab621615dd1e288a4a91e/dc084/kibana.png"\n        srcset="/static/3ff59d59a58ab621615dd1e288a4a91e/5243c/kibana.png 240w,\n/static/3ff59d59a58ab621615dd1e288a4a91e/ab158/kibana.png 480w,\n/static/3ff59d59a58ab621615dd1e288a4a91e/dc084/kibana.png 773w"\n        sizes="(max-width: 773px) 100vw, 773px"\n        style="width:100%;height:100%;margin:0;vertical-align:middle;position:absolute;top:0;left:0;"\n        loading="lazy"\n        decoding="async"\n      />\n    </span>'}}),"\n",a.createElement(n.h2,null,"Source code"),"\n",a.createElement(n.p,null,a.createElement(n.a,{href:"https://github.com/xwlee/cdk-elk"},"https://github.com/xwlee/cdk-elk")))}var i=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,o.ah)(),e.components);return n?a.createElement(n,e,a.createElement(s,e)):s(e)},l=t(534);function c(e){return a.createElement(l.Z,e,a.createElement(i,e))}l.Z}}]);
//# sourceMappingURL=component---node-modules-lekoarts-gatsby-theme-minimal-blog-core-src-templates-post-query-tsx-content-file-path-content-posts-setup-an-elk-stack-using-cdk-index-mdx-95b6b4931649f3176739.js.map