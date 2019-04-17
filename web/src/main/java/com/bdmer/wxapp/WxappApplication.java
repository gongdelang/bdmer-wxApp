package com.bdmer.wxapp;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * bdmer（帮点儿忙）微信小程序 springboot 后台
 *
 * @since 2019-04-17 11:48
 * @author gongdelang
 */
@SpringBootApplication
public class WxappApplication {
    private static final Logger LOG = LoggerFactory.getLogger(WxappApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(WxappApplication.class, args);

        LOG.info("bmder 服务启动成功");
    }

}
