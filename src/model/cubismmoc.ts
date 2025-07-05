// cubismmoc.ts (The ABSOLUTE, COMPLETE, FINAL Version)

declare let Live2DCubismCore: any;

/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

/**
 * MOC3ファイルの整合性をチェックするためのクラス
 */
export class MOC_NAMESPACE {
  /**
   * MOC3ファイルの整合性をチェックする
   * @param moc3 - MOC3ファイル
   * @returns trueなら整合性OK, falseならMOC3ファイルが破損している
   */
  public static hasMocConsistency(moc3: ArrayBuffer): boolean {
    const coreMoc = Live2DCubismCore.Moc.fromArrayBuffer(moc3, true);
    if (coreMoc === null) {
      return false;
    }
    coreMoc._release();
    return true;
  }
}

/**
 * Mocデータの管理
 *
 * Mocデータの管理を行うクラス。
 */
export class CubismMoc {
  /**
   * Mocデータの作成
   */
  public static create(
    mocBytes: ArrayBuffer,
    shouldCheckMocConsistency: boolean
  ): CubismMoc | null {
    let cubismMoc: CubismMoc | null = null;
    if (shouldCheckMocConsistency) {
      if (!MOC_NAMESPACE.hasMocConsistency(mocBytes)) {
        return null;
      }
    }
    const moc: any = Live2DCubismCore.Moc.fromArrayBuffer(mocBytes);
    if (moc) {
      cubismMoc = new CubismMoc(moc);
    }
    return cubismMoc;
  }

  /**
   * Mocデータを削除
   *
   * Mocデータを削除する。
   */
  public static delete(moc: CubismMoc): void {}

  /**
   * メモリを解放する
   */
  public release(): void {
    this._moc._release();
    this._moc = null;
  }

  /**
   * モデルを作成する
   *
   * @return 作成したモデル
   */
  public createModel(): any {
    let cubismModel: any = null;
    const model: any = this._moc.createModel();
    if (model) {
      cubismModel = {
        _model: model,
      };
    }
    return cubismModel;
  }

  /**
   * @brief .moc3 は Cubism SDK Native の Moc インスタンスを確保する
   *
   * @param mocBytes .moc3データのバイト列
   * @return Mocインスタンス
   */
  private static _fromArrayBuffer(mocBytes: ArrayBuffer): any | null {
    return Live2DCubismCore.Moc.fromArrayBuffer(mocBytes);
  }

  /**
   * コンストラクタ
   */
  private constructor(moc: any) {
    this._moc = moc;
  }

  private _moc: any;
}