import React from "react";


const SideBar = () => {

    return (
        <>
            <div class="row  text-center ">
                <div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-body-tertiary">
                    {/* 검색 + 추가 */}
                    <div class="d-flex align-items-center flex-shrink-0 p-3 link-body-emphasis text-decoration-none border-bottom">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button class="btn btn-outline-dark registerBtn" type="submit">추가</button>
                    </div>
                    {/* 검색 + 추가 */}

                    {/* 목록 */}
                    <div class="list-group list-group-flush border-bottom scrollarea scrollBar">
                        <a href="#" class="list-group-item list-group-item-action active py-3 lh-sm" aria-current="true">
                            <div class="d-flex w-100 align-items-center justify-content-between">
                                <strong class="mb-1">List group item heading</strong>
                                <small>Wed</small>
                            </div>
                            <div class="col-10 small">Some placeholder content</div>
                        </a>

                        <a href="#" class="list-group-item list-group-item-action py-3 lh-sm">
                            <div class="d-flex w-100 align-items-center justify-content-between">
                                <strong class="mb-1">List group item heading</strong>
                                <small class="text-body-secondary">Tues</small>
                            </div>
                            <div class="col-10 small">Some placeholder content</div>
                        </a>
                        <a href="#" class="list-group-item list-group-item-action py-3 lh-sm">
                            <div class="d-flex w-100 align-items-center justify-content-between">
                                <strong class="mb-1">List group item heading</strong>
                                <small class="text-body-secondary">Tues</small>
                            </div>
                            <div class="col-10 small">Some placeholder content</div>
                        </a>

                        <a href="#" class="list-group-item list-group-item-action py-3 lh-sm">
                            <div class="d-flex w-100 align-items-center justify-content-between">
                                <strong class="mb-1">List group item heading</strong>
                                <small class="text-body-secondary">Tues</small>
                            </div>
                            <div class="col-10 small">Some placeholder content</div>
                        </a>
                        <a href="#" class="list-group-item list-group-item-action py-3 lh-sm">
                            <div class="d-flex w-100 align-items-center justify-content-between">
                                <strong class="mb-1">List group item heading</strong>
                                <small class="text-body-secondary">Tues</small>
                            </div>
                            <div class="col-10 small">Some placeholder content</div>
                        </a>
                        <a href="#" class="list-group-item list-group-item-action py-3 lh-sm">
                            <div class="d-flex w-100 align-items-center justify-content-between">
                                <strong class="mb-1">List group item heading</strong>
                                <small class="text-body-secondary">Tues</small>
                            </div>
                            <div class="col-10 small">Some placeholder content</div>
                        </a>
                        <a href="#" class="list-group-item list-group-item-action py-3 lh-sm">
                            <div class="d-flex w-100 align-items-center justify-content-between">
                                <strong class="mb-1">List group item heading</strong>
                                <small class="text-body-secondary">Tues</small>
                            </div>
                            <div class="col-10 small">Some placeholder content</div>
                        </a>
                        <a href="#" class="list-group-item list-group-item-action py-3 lh-sm">
                            <div class="d-flex w-100 align-items-center justify-content-between">
                                <strong class="mb-1">List group item heading</strong>
                                <small class="text-body-secondary">Tues</small>
                            </div>
                            <div class="col-10 small">Some placeholder content</div>
                        </a>
                        <a href="#" class="list-group-item list-group-item-action py-3 lh-sm">
                            <div class="d-flex w-100 align-items-center justify-content-between">
                                <strong class="mb-1">List group item heading</strong>
                                <small class="text-body-secondary">Tues</small>
                            </div>
                            <div class="col-10 small">Some placeholder content</div>
                        </a>
                        <a href="#" class="list-group-item list-group-item-action py-3 lh-sm">
                            <div class="d-flex w-100 align-items-center justify-content-between">
                                <strong class="mb-1">List group item heading</strong>
                                <small class="text-body-secondary">Tues</small>
                            </div>
                            <div class="col-10 small">Some placeholder content</div>
                        </a>
                        <a href="#" class="list-group-item list-group-item-action py-3 lh-sm">
                            <div class="d-flex w-100 align-items-center justify-content-between">
                                <strong class="mb-1">List group item heading</strong>
                                <small class="text-body-secondary">Tues</small>
                            </div>
                            <div class="col-10 small">Some placeholder content</div>
                        </a>
                        {/* 목록 */}

                    </div>
                </div>
            </div>
        </>
    )
}

export default SideBar;