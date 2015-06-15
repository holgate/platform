// Copyright (c) 2015 Spinpunch, Inc. All Rights Reserved.
// See License.txt for license information.

package model

import (
	"encoding/json"
	"io"
)

type ExtraMember struct {
	Id       string `json:"id"`
	FullName string `json:"full_name"`
	Email    string `json:"email"`
	Roles    string `json:"roles"`
	Username string `json:"username"`
}

func (o *ExtraMember) Sanitize(options map[string]bool) {
	if len(options) == 0 || !options["email"] {
		o.Email = ""
	}
	if len(options) == 0 || !options["fullname"] {
		o.FullName = ""
	}
}

type ChannelExtra struct {
	Id      string        `json:"id"`
	Members []ExtraMember `json:"members"`
}

func (o *ChannelExtra) ToJson() string {
	b, err := json.Marshal(o)
	if err != nil {
		return ""
	} else {
		return string(b)
	}
}

func ChannelExtraFromJson(data io.Reader) *ChannelExtra {
	decoder := json.NewDecoder(data)
	var o ChannelExtra
	err := decoder.Decode(&o)
	if err == nil {
		return &o
	} else {
		return nil
	}
}
